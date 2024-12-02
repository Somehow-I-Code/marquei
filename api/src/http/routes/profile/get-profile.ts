import { FastifyInstance } from "fastify";

import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { refreshedTokenRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";
import profileRepository from "@repositories/profiles";
import { NOT_FOUND } from "@routes/utils/http-codes";

export async function getProfile(server: FastifyInstance) {
    server.get(
        "/profile",
        {
            preHandler: [verifyToken, findLoggedUser, refreshToken],
        },
        async (request, reply) => {
            const { profile: loggedInProfile, refreshedToken } =
                refreshedTokenRequest.parse(request);

            const profile = await profileRepository.findById(
                loggedInProfile.id,
            );

            if (!profile) {
                return reply.status(NOT_FOUND).send({
                    message: "Perfil não encontrado na base de dados",
                });
            }

            const { password, ...profileWithoutPassword } = profile;

            return reply.send({
                profile: profileWithoutPassword,
                refreshedToken,
            });
        },
    );
}
