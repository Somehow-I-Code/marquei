import { FastifyInstance } from "fastify";
import { HttpError, toggleProfile } from "./utils/toggle-profile";

export async function updateProfile(server: FastifyInstance) {
    server.patch("/profile/activate/:profileId", async (request, reply) => {
        try {
            const res = await toggleProfile(request, true);
            reply.status(200).send(res);
        } catch (e) {
            if (e instanceof HttpError) {
                return reply.status(e.code).send({ message: e.message });
            }
            return reply.status(500).send({ message: "Algo deu errado!" });
        }
    });
}
