import Fastify from "fastify";
import { createCategory } from "./src/http/routes/create-category";
import { createResources } from "./src/http/routes/create-resources";
import { getResources } from "./src/http/routes/get-resources";

const server = Fastify();

server.get("/hello", async (request, reply) => {
    reply.send({ hello: "thiago" });
});

server.register(createCategory);
server.register(createResources);
server.register(getResources);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
