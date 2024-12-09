import Fastify from "fastify";

import { auth } from "@routes/auth";
import { createCategories } from "@routes/create-categories";
import { createCompany } from "@routes/create-company";
import { createResources } from "@routes/create-resources";
import { getCategories } from "@routes/get-categories";
import { getCompanies } from "@routes/get-companies";
import { getResources } from "@routes/get-resources";
import {
    activateProfile,
    createProfile,
    deactivateProfile,
    deleteProfile,
    getLevels,
    getProfile,
    getProfiles,
} from "@routes/profile";

const server = Fastify();

// profile
server.register(createProfile);
server.register(getProfiles);
server.register(getProfile);
server.register(getLevels);
server.register(deleteProfile);
server.register(activateProfile);
server.register(deactivateProfile);

// auth
server.register(auth, { prefix: "/auth" });

server.register(createCategories);
server.register(createResources);
server.register(getResources);
server.register(getCategories);
server.register(createCompany);
server.register(getCompanies);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
