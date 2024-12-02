import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";

import { adminRoute } from "@middlewares/admin-route";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { userIdentifiedRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";
import profileRepository from "@repositories/profiles";
import { SUCCESS } from "@routes/utils/http-codes";

export async function getProfiles(server: FastifyInstance) {
    server.get(
        "/profiles",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute],
        },
        async (request, reply) => {
            const { profile } = userIdentifiedRequest.parse(request);

            const isSudo = profile.level === Level.SUDO;

            const profiles = await profileRepository.findAll(
                profile.companyId,
                isSudo,
            );

            return reply.status(SUCCESS).send({ profiles });
        },
    );
}
