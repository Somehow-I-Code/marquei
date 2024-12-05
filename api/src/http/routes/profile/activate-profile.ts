import { FastifyInstance } from "fastify";

import { adminRoute } from "@middlewares/admin-route";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { refreshedTokenRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";
import { SERVER_ERROR, SUCCESS } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";
import { toggleProfile } from "@routes/utils/toggle-profile";

export async function activateProfile(server: FastifyInstance) {
    server.patch(
        "/profile/activate/:profileId",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        async (request, reply) => {
            const { refreshedToken } = refreshedTokenRequest.parse(request);

            try {
                const res = await toggleProfile(request, true);

                const { password, ...profileWithoutPassword } = res;

                return reply
                    .status(SUCCESS)
                    .send({ profile: profileWithoutPassword, refreshedToken });
            } catch (e) {
                if (e instanceof HttpError) {
                    return reply.status(e.code).send({ message: e.message });
                }

                return reply
                    .status(SERVER_ERROR)
                    .send({ message: "Algo deu errado!" });
            }
        },
    );
}
