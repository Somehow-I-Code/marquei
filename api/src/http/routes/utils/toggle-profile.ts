import { Level } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { ZodError } from "zod";
import profileRepository from "../../../repositories/profiles";
import {
    ToggleProfileInput,
    toggleProfileSchema,
} from "../../../validators/profile";
import { getJwtSecret } from "./get-jwt-secret";
import { getToken } from "./get-token";

export class HttpError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.name = "HttpError";
        this.code = code;
    }
}

export async function toggleProfile(
    request: FastifyRequest,
    newState: boolean,
) {
    const token = getToken(request.headers);
    const secretKey = getJwtSecret();

    if (!token) {
        //TODO: Adicionar isso ao middleware de autorização
        throw new HttpError(401, "Falta token na requisição!");
    }

    const userProfile = verify(token, secretKey) as {
        level: Level;
        companyId: number;
    };

    let userProfileParams: ToggleProfileInput;

    try {
        userProfileParams = toggleProfileSchema.parse(request.params);
    } catch (error) {
        throw new HttpError(400, (error as ZodError).issues[0].message);
    }

    let { profileId } = userProfileParams;

    if (userProfile.level === Level.USER) {
        throw new HttpError(
            401,
            "Você não tem permissão para acessar essa tela!",
        );
    }

    try {
        const companyId =
            userProfile.level === Level.SUDO
                ? undefined
                : userProfile.companyId;

        const updatedProfileSUDO = await profileRepository.toggleProfile(
            profileId,
            companyId,
            newState,
        );

        throw updatedProfileSUDO;
    } catch {
        throw new HttpError(404, "Perfil não encontrado!");
    }
}
