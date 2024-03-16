import { FastifyInstance } from "fastify";
import resourcesRepository from "../../repositories/resources";
import { createResource } from "../../validators/resources";

export async function createResources(server: FastifyInstance) {
  //craindo a rota para criar rescursos
  server.post("/resources", async (request, reply) => {
    //O zod valida, trata e tipifica os dados.
    //No createResourceBody estou criando um esquema que define quais dados vc aceita no body da requisição.
    //Toda vez que queremos criar e atualizar uma informação pro api um dado a gente sempre manda no Body, é um padrão.

    //Filtra a informação que criei ou atualizei lá no body
    const { name, description, categoryId } = createResource.parse(
      request.body
    );

    //Insere name, description, categoryId na tebela resources
    // const resource = await prisma.resource.create({
    //   data: {
    //     name,
    //     description,
    //     categoryId,
    //   },
    // });
    const resource = await resourcesRepository.create({
      name,
      description,
      categoryId,
    });

    return reply.status(201).send(resource);
  });
}
