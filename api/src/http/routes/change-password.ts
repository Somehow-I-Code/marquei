import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";

export async function changePassword(server: FastifyInstance) {
    server.patch("/change-password", async (request, reply) => {
        if (typeof process.env.JWT_SECRET !== "string") {
            return reply
                .status(500)
                .send({ message: "Configuração de token não aplicada" });
        }

        const requestAuthorization = request.headers["authorization"];

        const token = requestAuthorization?.split(" ")[1];

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
