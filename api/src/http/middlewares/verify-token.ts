import { FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";

import { getJwtSecret } from "../routes/utils/get-jwt-secret";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";

export function verifyToken(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    const requestAuthorization = request.headers["authorization"];
    const token = requestAuthorization?.split(" ")[1];

    if (!token) {
        return reply
            .status(httpCodes.UNAUTHORIZED)
            .send({ message: "Faltando token de autenticação" });
    }

    let secretKey: string | undefined;

    try {
        secretKey = getJwtSecret();
    } catch (e) {
        return reply
            .status(httpCodes.SERVER_ERROR)
            .send({ message: (e as Error).message });
    }

    const profile = verify(token, secretKey) as {
        id: number;
        exp: number;
    };

    const now = Date.now();

    if (now > profile.exp) {
        return reply
            .status(httpCodes.UNAUTHORIZED)
            .send({ message: "Token expirado" });
    }

    request.userId = profile.id;

    next();
}
