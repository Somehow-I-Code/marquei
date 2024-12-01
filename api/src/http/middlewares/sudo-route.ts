import { Level } from "@prisma/client";
import { FastifyReply } from "fastify";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";

export function sudoRoute(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    const { profile } = request;

    if (!profile) {
        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Perfil logado inválido ",
        });
    }

    if (profile.level !== Level.SUDO) {
        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Usuário não tem permissão para acessar essa rota",
        });
    }

    next();
}
