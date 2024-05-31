import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { profileSchema } from "../../validators/profile";

export async function getProfile(server: FastifyInstance) {
    server.get("/profile", async (request, reply) => {
        if (typeof process.env.JWT_SECRET !== "string") {
            return reply
                .code(500)

                .send({ message: "Configuração de token não aplicada" });
        }

        const requestAuthorization = request.headers["authorization"];

        const token = requestAuthorization?.split(" ")[1];

        if (!token) {
            //TODO: Adicionar isso ao middleware de autorização
            return reply.send();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            email: string;
        };

        const profile = await profileRepository.findByEmail(decoded.email);

        const parsedProfile = await profileSchema.parse(profile);

        return reply.send(parsedProfile);
    });
}
