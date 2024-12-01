import { FastifyReply } from "fastify";
import profileRepository from "../../repositories/profiles";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";

export async function findLoggedUser(
    request: LoggedRequest,
    reply: FastifyReply,
) {
    const { userId } = request;

    if (!userId) {
        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Faltando token de autenticação",
        });
    }

    const profile = await profileRepository.findById(userId);

    if (!profile) {
        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Perfil logado inválido",
        });
    }

    if (!profile.isActive) {
        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Usuário logado desativado",
        });
    }

    request.profile = profile;
}

