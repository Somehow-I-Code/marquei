import { FastifyInstance } from "fastify";

import { profilesController } from "@controllers/profiles";
import { adminRoute } from "@middlewares/admin-route";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { verifyToken } from "@middlewares/verify-token";

export function profiles(
    server: FastifyInstance,
    _: any,
    done: (err?: Error) => void,
) {
    server.get(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        profilesController.index,
    );

    server.get(
        "/all",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute],
        },
        profilesController.all,
    );

    server.post(
        "/",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        profilesController.create,
    );

    server.patch(
        "/activate/:profileId",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        profilesController.activate,
    );

    server.patch(
        "/deactivate/:profileId",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        profilesController.deactivate,
    );

    server.get(
        "/levels",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute],
        },
        profilesController.levels,
    );

    server.delete(
        "/:profileId",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        profilesController.delete,
    );

    done();
}
