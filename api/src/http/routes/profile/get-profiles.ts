import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";

import profileRepository from "@repositories/profiles";
import { getJwtSecret } from "@routes/utils/get-jwt-secret";
import { getToken } from "@routes/utils/get-token";
import httpCodes from "@routes/utils/http-codes";

export async function getProfiles(server: FastifyInstance) {
    server.get("/profiles", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply
                .status(httpCodes.BAD_REQUEST)
                .send({ message: "Token inválido!" });
        }

        const userProfile = verify(token, secretKey) as {
            level: Level;
            companyId: number;
        };
        if (userProfile.level === Level.USER) {
            return reply.status(httpCodes.UNAUTHORIZED).send({
                message: "Você não tem permissão para acessar esta tela!",
            });
        }

        const isSudo = userProfile.level == Level.SUDO;
        const profiles = await profileRepository.findAll(
            userProfile.companyId,
            isSudo,
        );
        return reply.status(httpCodes.SUCCESS).send(profiles);
    });
}
