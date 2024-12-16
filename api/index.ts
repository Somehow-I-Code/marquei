import Fastify from "fastify";

import { auth } from "@routes/auth";
import { categories } from "@routes/categories";
import { companies } from "@routes/companies";
import { profiles } from "@routes/profiles";
import { resources } from "@routes/resources";
import { globalErrorHandler } from "src/global-error-handler";

const server = Fastify();

server.register(profiles, { prefix: "/profiles" });
server.register(auth, { prefix: "/auth" });
server.register(categories, { prefix: "/categories" });
server.register(companies, { prefix: "/companies" });
server.register(resources, { prefix: "/resources" });

server.setErrorHandler(globalErrorHandler);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
