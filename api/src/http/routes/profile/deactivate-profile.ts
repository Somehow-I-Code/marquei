import { FastifyInstance } from "fastify";
import httpCodes from "../utils/http-codes";
import HttpError from "../utils/http-error";
import { toggleProfile } from "../utils/toggle-profile";

export async function deactivateProfile(server: FastifyInstance) {
    server.patch("/profile/deactivate/:profileId", async (request, reply) => {
        try {
            const res = await toggleProfile(request, false);
            return reply.status(httpCodes.SUCCESS).send(res);
        } catch (e) {
            if (e instanceof HttpError) {
                return reply.status(e.code).send({ message: e.message });
            }

            return reply
                .status(httpCodes.SERVER_ERROR)
                .send({ message: "Algo deu errado!" });
        }
    });
}
