import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getResources(server: FastifyInstance) {
  server.get("/resources", async (request, reply) => {
    const resource = await prisma.resource.findMany({
      include: {
        Category: true,
      },
    });
    return reply.send(resource);
  });
}
