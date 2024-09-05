import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { getToken } from "./utils/get-token";
import profileRepository from "../../repositories/profiles";

export async function ProfilesList(server: FastifyInstance) {
    server.post("/profiles-list", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        const userProfile = verify(token, secretKey) as {
            level: Level;
            email: string;
        };
        if (userProfile.level === Level.USER) {
            return reply.status(401).send({
                message: "Você não tem permissão para acessar esta tela!",
            });
        }
        if (userProfile.level === Level.ADMIN){
            const profile = await profileRepository.findByEmail(
                userProfile.email,
            );

            if (!profile) {
                return reply
                    .status(404)
                    .send({ message: "Perfil não encontrado!" });
            }

            return reply.status(200).send({ profile });
        }
    });
}
