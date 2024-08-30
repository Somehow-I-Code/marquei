import { FastifyInstance } from "fastify";

import categoriesRepository from "../../repositories/categories";
import { createCategory } from "../../validators/categories";

export async function createCategories(server: FastifyInstance) {
    server.post("/categories", async (request, reply) => {
        const { name, companyId } = createCategory.parse(request.body);

        const category = await categoriesRepository.create({
            name,
            companyId,
        });

        return reply.status(201).send(category);
    });
}
