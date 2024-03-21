import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createCategory(server: FastifyInstance) {
  server.post("/categories", async (request, reply) => {
    const createCategoryBody = z.object({
      title: z.string(),
    });

    const { title } = createCategoryBody.parse(request.body);

    const category = await prisma.category.create({
      data: {
        title,
      },
    });

    return reply.status(201).send(category);
  });
}
