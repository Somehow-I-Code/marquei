import { FastifyInstance } from "fastify";
import categoriesRepository from "../../repositories/categories";

export async function getCategories(server: FastifyInstance) {
    server.get("/categories", async (request, reply) => {
        const categories = await categoriesRepository.findAll();

        return reply.send(categories);
    });
}
