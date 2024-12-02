import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";

import { adminRoute } from "@middlewares/admin-route";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { refreshedTokenRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";
import profileRepository from "@repositories/profiles";
import { SUCCESS } from "@routes/utils/http-codes";

export async function getProfiles(server: FastifyInstance) {
    server.get(
        "/profiles",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        async (request, reply) => {
            const { profile, refreshedToken } =
                refreshedTokenRequest.parse(request);

            const isSudo = profile.level === Level.SUDO;

            const profiles = await profileRepository.findAll(
                profile.companyId,
                isSudo,
            );

            return reply.status(SUCCESS).send({ profiles, refreshedToken });
        },
    );
}
