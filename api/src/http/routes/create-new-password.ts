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
        let createNewPassword: CreateNewPasswordInput;
    
        try {
            createNewPassword = createNewPasswordSchema.parse(request.body);
        } catch (error) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const { token, newPassword, repeatPassword } = createNewPassword;

        if (!token) {
            return reply
                .status(httpCodes.UNAUTHORIZED)
                .send({ message: "Token inválido!" });
        }

        const decoded = jwt.verify(token, secretKey) as {
            id: number;
            expiresAt: number;
        };

        const isTokenExpired = Date.now() > decoded.expiresAt;

        if (isTokenExpired) {
            return reply
                .status(httpCodes.UNAUTHORIZED)
                .send({ message: "Token expirado!" });
        }

        if (newPassword !== repeatPassword) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message:
                    "A confirmação de senha não coincide com a nova senha.",
            });
        }

        const profile = await profileRepository.findById(decoded.id);
        if (!profile) {
            return reply
                .status(httpCodes.NOT_FOUND)
                .send({ message: "Usuário não encontrado!" });
        }

        await profileRepository.updatePassword(profile.id, newPassword);

        return reply
            .status(httpCodes.SUCCESS)
            .send({ message: "Senha atualizada com sucesso!" });
    });
}


