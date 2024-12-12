import { FastifyReply } from "fastify";

import { decodeAuthToken } from "@http/utils/decode-auth-token";
import { validateAuthToken } from "@http/utils/validate-auth-token";
import HttpError from "@routes/utils/http-error";
import { SERVER_ERROR, UNAUTHORIZED } from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";

export function verifyToken(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    try {
        const requestAuthorization = request.headers["authorization"];
        const token = requestAuthorization?.split(" ")[1];

        if (!token) {
            throw new HttpError(UNAUTHORIZED, "Faltando token de autenticação");
        }

        const profile = decodeAuthToken(token);
        validateAuthToken(token);

        request.userId = profile.id;

        next();
    } catch (e) {
        if (e instanceof HttpError) {
            return reply.status(e.code).send({ message: e.message });
        }

        return reply
            .status(SERVER_ERROR)
            .send({ message: "Erro interno do servidor" });
    }
}
