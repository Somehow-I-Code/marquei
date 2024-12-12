import { Level } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { userIdentifiedRequest } from "@middlewares/validator/requests";
import profileRepository from "@repositories/profiles";
import { ToggleProfileInput, toggleProfileSchema } from "@validators/profiles";
import { BAD_REQUEST, NOT_FOUND } from "./http-codes";
import HttpError from "./http-error";

export async function toggleProfile(
    request: FastifyRequest,
    newState: boolean,
) {
    const { profile: userProfile } = userIdentifiedRequest.parse(request);

    let userProfileParams: ToggleProfileInput;

    try {
        userProfileParams = toggleProfileSchema.parse(request.params);
    } catch (error) {
        throw new HttpError(BAD_REQUEST, (error as ZodError).issues[0].message);
    }

    let { profileId } = userProfileParams;

    try {
        const companyId =
            userProfile.level === Level.SUDO
                ? undefined
                : userProfile.companyId;

        const updatedProfile = await profileRepository.toggleProfile(
            userProfile,
            profileId,
            companyId,
            newState,
        );

        return updatedProfile;
    } catch (e) {
        throw new HttpError(NOT_FOUND, "Perfil não encontrado");
    }
}
