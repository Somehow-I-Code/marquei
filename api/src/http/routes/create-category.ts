import { FastifyInstance } from "fastify";
import { z } from "zod";
import categoriesRepository from "../../repositories/categories";

export async function createCategory(server: FastifyInstance) {
  server.post("/categories", async (request, reply) => {
    const createCategoryBody = z.object({
      title: z.string(),
    });

    const { title } = createCategoryBody.parse(request.body);

    const category = await categoriesRepository.create({
      title,
    });

    return reply.status(201).send(category);
  });
}
