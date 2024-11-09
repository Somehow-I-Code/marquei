import Fastify from "fastify";
import { changePassword } from "./src/http/routes/change-password";
import { createCategories } from "./src/http/routes/create-categories";
import { createCompany } from "./src/http/routes/create-company";
import CreateNewPassword from "./src/http/routes/create-new-password";
import { createProfile } from "./src/http/routes/create-profile";
import { createResources } from "./src/http/routes/create-resources";
import { getCategories } from "./src/http/routes/get-categories";
import { getLevels } from "./src/http/routes/get-levels";
import { getProfile } from "./src/http/routes/get-profile";
import { getResources } from "./src/http/routes/get-resources";
import { login } from "./src/http/routes/login";
import { updateProfileActivate } from "./src/http/routes/profile-activate";
import { updateProfile } from "./src/http/routes/profile-deactivate";
import { ProfilesList } from "./src/http/routes/profiles-list";
import { resetPassword } from "./src/http/routes/reset-password";
import { sudoLogin } from "./src/http/routes/sudo-login";
import { getCompanies } from "./src/http/routes/get-companies";

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
server.register(ProfilesList);
server.register(CreateNewPassword);
server.register(getCompanies);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
