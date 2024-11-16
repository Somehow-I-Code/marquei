import Fastify from "fastify";
import { changePassword } from "./src/http/routes/change-password";
import { createCategories } from "./src/http/routes/create-categories";
import { createCompany } from "./src/http/routes/create-company";
import CreateNewPassword from "./src/http/routes/create-new-password";
import { createProfile } from "./src/http/routes/create-profile";
import { createResources } from "./src/http/routes/create-resources";
import { deleteProfile } from "./src/http/routes/delete-profile";
import { getCategories } from "./src/http/routes/get-categories";
import { getCompanies } from "./src/http/routes/get-companies";
import { getLevels } from "./src/http/routes/get-levels";
import { getProfile } from "./src/http/routes/get-profile";
import { getProfiles } from "./src/http/routes/get-profiles";
import { getResources } from "./src/http/routes/get-resources";
import { login } from "./src/http/routes/login";
import { updateProfileActivate } from "./src/http/routes/profile-activate";
import { updateProfile } from "./src/http/routes/profile-deactivate";
import { resetPassword } from "./src/http/routes/reset-password";
import { sudoLogin } from "./src/http/routes/sudo-login";

const server = Fastify();

server.register(createCategories);
server.register(createResources);
server.register(createProfile);
server.register(getResources);
server.register(getCategories);
server.register(getLevels);
server.register(login);
server.register(getProfile);
server.register(resetPassword);
server.register(changePassword);
server.register(sudoLogin);
server.register(createCompany);
server.register(updateProfile);
server.register(updateProfileActivate);
server.register(CreateNewPassword);
server.register(getCompanies);
server.register(getProfiles);
server.register(deleteProfile);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
