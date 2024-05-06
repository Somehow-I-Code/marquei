import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";

export async function getLevels(server: FastifyInstance) {
    server.get("/levels", async (request, reply) => {
        return reply.send(Object.keys(Level));
    });
}
