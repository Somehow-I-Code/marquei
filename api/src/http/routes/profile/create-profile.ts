import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";

import { adminRoute } from "@middlewares/admin-route";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { refreshedTokenRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";
import profileRepository from "@repositories/profiles";
import { CREATED, UNAUTHORIZED } from "@routes/utils/http-codes";
import { createProfileSchema } from "@validators/profile";

export async function createProfile(server: FastifyInstance) {
    server.post(
        "/profiles",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        async (request, reply) => {
            const { profile, refreshedToken } =
                refreshedTokenRequest.parse(request);

            const data = createProfileSchema.parse(request.body);
            const { level, companyId } = data;

            const isAdmin = profile.level === Level.ADMIN;
            const isInTheSameCompany = profile.companyId === companyId;
            const newUserIsSudo = level === Level.SUDO;

            if (isAdmin && (!isInTheSameCompany || newUserIsSudo)) {
                return reply.status(UNAUTHORIZED).send({
                    message:
                        "Você não tem permissão para executar esta operação!",
                });
            }

            const newProfile = await profileRepository.create(data);

            const { password, ...profileWithoutPassword } = newProfile;

            return reply
                .status(CREATED)
                .send({ newProfile: profileWithoutPassword, refreshedToken });
        },
    );
}
