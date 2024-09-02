import { FastifyInstance } from "fastify";

import resourcesRepository from "../../repositories/resources";
import { createResource } from "../../validators/resources";

export async function createResources(server: FastifyInstance) {
    server.post("/resources", async (request, reply) => {
        const { name, description, categoryId, companyId } =
            createResource.parse(request.body);

        const resource = await resourcesRepository.create({
            name,
            description,
            categoryId,
            companyId,
        });

        return reply.status(201).send(resource);
    });
}
