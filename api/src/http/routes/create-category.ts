import { FastifyInstance } from "fastify";
import categoriesRepository from "../../repositories/categories";
import { createCategory } from "../../validators/categories";

export async function createCategories(server: FastifyInstance) {
    server.post("/categories", async (request, reply) => {
        const { title } = createCategory.parse(request.body);

        const category = await categoriesRepository.create({
            title,
        });

        return reply.status(201).send(category);
    });
}
