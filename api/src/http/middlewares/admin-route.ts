import { Level } from "@prisma/client";
import { FastifyReply } from "fastify";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";
import { userIdentifiedRequest } from "./validator/requests";

export function adminRoute(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    const { profile } = userIdentifiedRequest.parse(request);

    if (profile.level === Level.USER) {
        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Usuário não tem permissão para acessar essa rota",
        });
    }

    next();
}
