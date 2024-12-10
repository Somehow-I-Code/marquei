import { categoriesController } from "@controllers/categories";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { verifyToken } from "@middlewares/verify-token";
import { FastifyInstance } from "fastify";

export async function categories(
    server: FastifyInstance,
    _: any,
    done: (err?: Error) => void,
) {
    server.get(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        categoriesController.index,
    );

    server.post(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser, refreshToken],
        },
        categoriesController.create,
    );

    done();
}
