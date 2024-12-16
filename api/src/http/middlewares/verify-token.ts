import { FastifyReply } from "fastify";

import { decodeAuthToken } from "@http/utils/decode-auth-token";
import { validateAuthToken } from "@http/utils/validate-auth-token";
import HttpError from "@routes/utils/http-error";
import { UNAUTHORIZED } from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";

export function verifyToken(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    const requestAuthorization = request.headers["authorization"];
    const token = requestAuthorization?.split(" ")[1];

    if (!token) {
        throw new HttpError(UNAUTHORIZED, "Faltando token de autenticação");
    }

    const profile = decodeAuthToken(token);
    validateAuthToken(token);

    request.userId = profile.id;

    next();
}
