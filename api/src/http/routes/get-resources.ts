import { FastifyInstance } from "fastify";
import resourcesRepository from "../../repositories/resources";

export async function getResources(server: FastifyInstance) {
  server.get("/resources", async (request, reply) => {
    const resources = await resourcesRepository.findAll();

    return reply.send(resources);
  });
}
