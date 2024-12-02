import Fastify from "fastify";

import { changePassword } from "@routes/change-password";
import { createCategories } from "@routes/create-categories";
import { createCompany } from "@routes/create-company";
import CreateNewPassword from "@routes/create-new-password";
import { createResources } from "@routes/create-resources";
import { getCategories } from "@routes/get-categories";
import { getCompanies } from "@routes/get-companies";
import { getResources } from "@routes/get-resources";
import { login } from "@routes/login";
import {
    activateProfile,
    createProfile,
    deactivateProfile,
    deleteProfile,
    getLevels,
    getProfile,
    getProfiles,
} from "@routes/profile";
import { resetPassword } from "@routes/reset-password";
import { sudoLogin } from "@routes/sudo-login";

const server = Fastify();

// profile
server.register(createProfile);
server.register(getProfiles);
server.register(getProfile);
server.register(getLevels);
server.register(deleteProfile);
server.register(activateProfile);
server.register(deactivateProfile);

server.register(createCategories);
server.register(createResources);
server.register(getResources);
server.register(getCategories);
server.register(login);
server.register(resetPassword);
server.register(changePassword);
server.register(sudoLogin);
server.register(createCompany);
server.register(CreateNewPassword);
server.register(getCompanies);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
