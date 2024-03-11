import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyRequest } from "fastify";
import { z } from "zod";

const server = Fastify();
const prisma = new PrismaClient();

server.get("/hello", async (request, reply) => {
  reply.send({ hello: "thiago" });
});

server.get("/resources", async (request, reply) => {
  reply.send({
    data: [
      {
        name: "Resource #1",
        description: "#1 Here we have some text helping describe that resource",
        category: "Médicos",
      },

      {
        name: "Resource #2",
        description: "#2 Here we have some text helping describe that resource",
        category: "Médicos",
      },

      {
        name: "Resource #3",
        description: "#3 Here we have some text helping describe that resource",
        category: "Médicos",
      },

      {
        name: "Resource #4",
        description: "#4 Here we have some text helping describe that resource",
        category: "Médicos",
      },

      {
        name: "Resource #5",
        description: "#5 Here we have some text helping describe that resource",
        category: "Médicos",
      },

      {
        name: "Resource #6",
        description: "#6 Here we have some text helping describe that resource",
        category: "Exames",
      },

      {
        name: "Resource #7",
        description: "#7 Here we have some text helping describe that resource",
        category: "Exames",
      },

      {
        name: "Resource #8",
        description: "#8 Here we have some text helping describe that resource",
        category: "Exames",
      },

      {
        name: "Resource #9",
        description: "#9 Here we have some text helping describe that resource",
        category: "Resultados",
      },
    ],
  });
});

server.get("/players", async function (request, reply) {
  const players = await prisma.player.findMany();
  reply.send(players);
});

server.post("/players", async function (request, reply) {
  const playerSchema = z.object({
    name: z.string(),
    position: z.string(),
    number: z.number(),
  });
  const { name, position, number } = playerSchema.parse(request.body);
  const player = await prisma.player.create({
    data: {
      name,
      position,
      number,
    },
  });
  reply.status(201).send({ id: player.id });
});

server.get("/players/:id", async function (request:FastifyRequest<{Params:{id:string}}>, reply){
  const id = Number(request.params.id);
  const player = await prisma.player.findUnique({
    where:{
      id
    }
  })
  reply.send(player)
  })

  server.delete("/players/:id", async function (request:FastifyRequest<{Params:{id:string}}>,reply){
    const id = Number(request.params.id);
    const playerdeleted = await prisma.player.delete({
      where:{
        id: id,
      }
    })
    reply.status(204).send(playerdeleted)
  })


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
