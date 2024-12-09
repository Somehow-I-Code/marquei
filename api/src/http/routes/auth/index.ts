import { FastifyInstance } from "fastify";

import { authController } from "@controllers/auth";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { sudoRoute } from "@middlewares/sudo-route";
import { verifyToken } from "@middlewares/verify-token";

export async function auth(server: FastifyInstance) {
    server.post("/login", authController.login);

    server.post(
        "/sudo-login",
        {
            preHandler: [verifyToken, findLoggedUser, sudoRoute],
        },
        authController.sudoLogin,
    );

    server.patch(
        "/update-password",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        authController.updatePassword,
    );

    server.post("/reset-password-token", authController.resetPasswordToken);

    server.post("/reset-password", authController.resetPassword);

    server.post(
        "/set-password",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        authController.setPassword,
    );
}
