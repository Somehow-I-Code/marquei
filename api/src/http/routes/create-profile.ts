import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { IncomingHttpHeaders } from "http";
import { verify } from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { createProfileSchema } from "../../validators/profile";

function getToken(headers: IncomingHttpHeaders) {
    const { authorization } = headers;

    return authorization?.split(" ")[1];
}

export async function createProfile(server: FastifyInstance) {
    server.post("/profiles", async (request, reply) => {
        const token = getToken(request.headers);

        if (!token) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        if (process.env.JWT_SECRET === undefined) {
            return reply
                .status(500)
                .send({ message: "JWT secret não configurado!" });
        }

        // Decodificando o token
        const profile = verify(token, process.env.JWT_SECRET) as {
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

            return reply.status(201).send(newProfile);
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

            return reply.status(201).send(newProfile);
        }

        return reply.status(401).send({
            message: "Você não tem permissão para executar esta operação!",
        });
    });
}
