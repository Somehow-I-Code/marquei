import Fastify from "fastify";
import { createCategories } from "./src/http/routes/create-categories";
import { createProfile } from "./src/http/routes/create-profile";
import { createResources } from "./src/http/routes/create-resources";
import { getCategories } from "./src/http/routes/get-categories";
import { getLevels } from "./src/http/routes/get-levels";
import { getResources } from "./src/http/routes/get-resources";
import { login } from "./src/http/routes/login";

const server = Fastify();

server.get("/hello", async (request, reply) => {
    reply.send({ hello: "thiago" });
});

server.register(createCategories);
server.register(createResources);
server.register(createProfile);
server.register(getResources);
server.register(getCategories);
server.register(getLevels);

// 3 - Registrar endpoint
// Registrando o endpoint para reconhecer a rota
server.register(login);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
