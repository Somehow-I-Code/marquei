import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

import { adminRoute } from "@middlewares/admin-route";
import { findLoggedUser } from "@middlewares/find-logged-user";
import { refreshToken } from "@middlewares/refresh-token";
import { refreshedTokenRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";
import profileRepository from "@repositories/profiles";
import { BAD_REQUEST, NOT_FOUND, SUCCESS } from "@routes/utils/http-codes";
import { DeleteProfileInput, deleteProfileSchema } from "@validators/profile";

export async function deleteProfile(server: FastifyInstance) {
    server.delete(
        "/profiles/:id",
        {
            preHandler: [verifyToken, findLoggedUser, adminRoute, refreshToken],
        },
        async (request, reply) => {
            const { profile: loggedInProfile, refreshedToken } =
                refreshedTokenRequest.parse(request);

            let profile: DeleteProfileInput;

            try {
                profile = deleteProfileSchema.parse(request.params);
            } catch (error) {
                return reply.status(BAD_REQUEST).send({
                    message: (error as ZodError).issues[0].message,
                });
            }

            const deletedProfile = await profileRepository.delete(
                profile.id,
                loggedInProfile,
            );

            if (!deletedProfile) {
                return reply.status(NOT_FOUND).send({
                    message: "Perfil não encontrado na base de dados",
                });
            }

            return reply
                .status(SUCCESS)
                .send({ profile: deletedProfile, refreshedToken });
        },
    );
}
