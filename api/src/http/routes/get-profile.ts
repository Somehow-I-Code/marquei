import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";

export async function getProfile(server: FastifyInstance) {
    server.get("/profile", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            //TODO: Adicionar isso ao middleware de autorização
            return reply.send({ message: "Token inválido!" });
        }

        const decoded = jwt.verify(token, secretKey) as {
            id: number;
        };

        const profile = await profileRepository.findById(decoded.id);

        return reply.send(profile);
    });
}
