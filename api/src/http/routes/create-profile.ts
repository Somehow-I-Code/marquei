import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { createProfileSchema } from "../../validators/profile";
import { getToken } from "../routes/utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";
import httpCodes from "./utils/http-codes";

export async function createProfile(server: FastifyInstance) {
    server.post("/profiles", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply
                .status(httpCodes.BAD_REQUEST)
                .send({ message: "Token inválido!" });
        }

        const profile = verify(token, secretKey) as {
            level: Level;
            companyId: number;
        };

        const { name, occupation, email, level, companyId } =
            createProfileSchema.parse(request.body);

        const isSudo = profile.level === Level.SUDO;

        if (isSudo) {
            const newProfile = await profileRepository.create({
                name,
                occupation,
                email,
                level,
                companyId,
            });

            return reply.status(httpCodes.CREATED).send(newProfile);
        }

        const isAdmin = profile.level === Level.ADMIN;
        const isInTheSameCompany = profile.companyId === companyId;
        const newUserIsNotSudo = level !== Level.SUDO;

        if (isAdmin && isInTheSameCompany && newUserIsNotSudo) {
            const newProfile = await profileRepository.create({
                name,
                occupation,
                email,
                level,
                companyId,
            });

            return reply.status(httpCodes.CREATED).send(newProfile);
        }

        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Você não tem permissão para executar esta operação!",
        });
    });
}
