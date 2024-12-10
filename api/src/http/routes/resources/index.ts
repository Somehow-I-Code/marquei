import { resourcesController } from "@controllers/resources";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { verifyToken } from "@middlewares/verify-token";
import { FastifyInstance } from "fastify";

export async function resources(
    server: FastifyInstance,
    _: any,
    done: (err?: Error) => void,
) {
    server.get(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        resourcesController.index,
    );

    server.post(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser, refreshToken],
        },
        resourcesController.create,
    );

    done();
}
