import { FastifyInstance } from "fastify";
import HttpError from "./utils/http-error";
import { toggleProfile } from "./utils/toggle-profile";

export async function updateProfileActivate(server: FastifyInstance) {
    server.patch("/profile/activate/:profileId", async (request, reply) => {
        try {
            const res = await toggleProfile(request, true);
            return reply.status(200).send(res);
        } catch (e) {
            if (e instanceof HttpError) {
                return reply.status(e.code).send({ message: e.message });
            }
            return reply.status(500).send({ message: "Algo deu errado!" });
        }
    });
}
