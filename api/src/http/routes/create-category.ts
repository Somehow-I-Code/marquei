import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createCategory(server: FastifyInstance) {
    //Rota para criar uma nova categoria
    server.post('/categories', async (request, reply) => {
        const createCategoryBody = z.object({
            title: z.string(),
    })
  
    //Fazer uma validação
    const { title } = createCategoryBody.parse(request.body)
  
    const category = await prisma.category.create({
        //O dado que vai ser inserido na tabela
        data: {
            title,
        },
    })

    return reply.status(201).send(category)
    });  
}

