import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createResources(server: FastifyInstance) {
  //craindo a rota para criar rescursos
  server.post("/resources", async (request, reply) => {
    //O zod valida, trata e tipifica os dados.
    //No createResourceBody estou criando um esquema que define quais dados vc aceita no body da requisição.
    //Toda vez que queremos criar e atualizar uma informação pro api um dado a gente sempre manda no Body, é um padrão.
    const createResourceBody = z.object({
      name: z.string(),
      description: z.string(),
      categoryId: z.number(),
    });

    //Filtra a informação que criei ou atualizei lá no body
    const { name, description, categoryId } = createResourceBody.parse(
      request.body
    );

    //Insere name, description, categoryId na tebela resources
    const resource = await prisma.resource.create({
      data: {
        name,
        description,
        categoryId,
      },
    });

    return reply.status(201).send(resource);
  });
}
