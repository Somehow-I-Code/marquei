import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { getToken } from "./utils/get-token";

export async function getProfile(server: FastifyInstance) {
    server.get("/profile", async (request, reply) => {
        const token = getToken(request.headers);

        if (typeof process.env.JWT_SECRET !== "string") {
            return reply
                .status(500)
                .send({ message: "Configuração de token não aplicada" });
        }

        if (!token) {
            //TODO: Adicionar isso ao middleware de autorização
            return reply.send({ message: "Falta token na requisição" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            id: number;
        };

        const profile = await profileRepository.findById(decoded.id);

        return reply.send(profile);
    });
}
