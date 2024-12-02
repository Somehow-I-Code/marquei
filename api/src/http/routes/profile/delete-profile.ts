import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

import { Level } from "@prisma/client";
import profileRepository from "../../../repositories/profiles";
import {
    DeleteProfileInput,
    deleteProfileSchema,
} from "../../../validators/profile";
import { getJwtSecret } from "../utils/get-jwt-secret";
import { getToken } from "../utils/get-token";
import httpCodes from "../utils/http-codes";

export async function deleteProfile(server: FastifyInstance) {
    server.delete("/profiles/:id", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.send({ message: "Token inválido!" });
        }

        let profile: DeleteProfileInput;

        try {
            profile = deleteProfileSchema.parse(request.params);
        } catch (error) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const { id } = profile;

        const currentUser = jwt.verify(token, secretKey) as {
            level: Level;
            companyId: number;
        };

        if (currentUser.level === Level.USER) {
            return reply
                .status(httpCodes.UNAUTHORIZED)
                .send({ message: "Usuário não autorizado!" });
        }

        const deletedProfile = await profileRepository.delete(id, currentUser);

        if (!deletedProfile) {
            return reply
                .status(httpCodes.NOT_FOUND)
                .send({ message: "Perfil não encontrado na base de dados" });
        }

        return reply
            .status(httpCodes.SUCCESS)
            .send({ profile: deletedProfile });
    });
}
