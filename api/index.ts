import Fastify from "fastify";

const server = Fastify();

server.get("/hello", async (request, reply) => {
  reply.send({ hello: "thiago" });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
