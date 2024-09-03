import { FastifyInstance } from "fastify";

export async function updateProfile(server: FastifyInstance) {
    server.patch("/profile", async (request, reply) => {});
}
