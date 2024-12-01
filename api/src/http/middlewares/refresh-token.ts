import { sign } from "jsonwebtoken";
import { getJwtSecret } from "../routes/utils/get-jwt-secret";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";
import { FastifyReply } from "fastify";

export function refreshToken(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    const { profile } = request;

    if (!profile) {
        return reply
            .status(httpCodes.UNAUTHORIZED)
            .send({ message: "Perfil logado inválido!" });
    }

    const { password, ...profileWithoutPassword } = profile;

    let secretKey: string | undefined;

    try {
        secretKey = getJwtSecret();
    } catch (e) {
        return reply
            .status(httpCodes.SERVER_ERROR)
            .send({ message: (e as Error).message });
    }

    const token = sign(
        {
            ...profileWithoutPassword,
            iat: Date.now(),
            exp: Date.now() + 60 * 60 * 24 * 1000,
        },
        secretKey,
    );

    request.refreshedToken = token;
    next();
}
