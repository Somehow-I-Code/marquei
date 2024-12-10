import { companiesController } from "@controllers/companies";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { sudoRoute } from "@middlewares/sudo-route";
import { verifyToken } from "@middlewares/verify-token";
import { FastifyInstance } from "fastify";

export async function companies(
    server: FastifyInstance,
    _: any,
    done: (err?: Error) => void,
) {
    server.get(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser, sudoRoute],
        },
        companiesController.index,
    );

    server.post(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser, sudoRoute, refreshToken],
        },
        companiesController.create,
    );

    done();
}
