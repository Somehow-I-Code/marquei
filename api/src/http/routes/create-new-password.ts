import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import profileRepository from "../../repositories/profiles";
import {
    CreateNewPasswordInput,
    createNewPasswordSchema,
} from "../../validators/create-new-password";
import { getJwtSecret } from "./utils/get-jwt-secret";
import httpCodes from "./utils/http-codes";

export default async function createNewPassword(server: FastifyInstance) {
    server.patch("/create-new-password", async (request, reply) => {
        const secretKey = getJwtSecret();

        const { token, ...passwordData } = request.body as {
            token: string;
            newPassword: string;
            repeatPassword: string;
        };

        if (!token) {
            return reply
                .status(httpCodes.UNAUTHORIZED)
                .send({ message: "Token inválido!" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, secretKey) as {
                id: number;
                expiresAt: number;
            };
            if (Date.now() > decoded.expiresAt) {
                return reply
                    .status(httpCodes.UNAUTHORIZED)
                    .send({ message: "Token expirado!" });
            }
        } catch (error) {
            return reply
                .status(httpCodes.UNAUTHORIZED)
                .send({ message: "Token inválido!" });
        }

        let createNewPassword: CreateNewPasswordInput;
        try {
            createNewPassword = createNewPasswordSchema.parse(passwordData);
        } catch (error) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const profile = await profileRepository.findById(decoded.id);

        if (!profile) {
            return reply
                .status(httpCodes.NOT_FOUND)
                .send({ message: "Usuário não encontrado!" });
        }

        const { newPassword, repeatPassword } = createNewPassword;

        if (newPassword !== repeatPassword) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message:
                    "A confirmação de senha não coincide com a nova senha.",
            });
        }

        await profileRepository.updatePassword(profile.id, newPassword);

        return reply
            .status(httpCodes.SUCCESS)
            .send({ message: "Senha atualizada com sucesso!" });
    });
}

