import { FastifyReply } from "fastify";
import { sign } from "jsonwebtoken";
import { getJwtSecret } from "../routes/utils/get-jwt-secret";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";
import { userIdentifiedRequest } from "./validator/requests";

const _24_HOURS = 60 * 60 * 24 * 1000;

export function refreshToken(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    const { profile } = userIdentifiedRequest.parse(request);

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
            exp: Date.now() + _24_HOURS,
        },
        secretKey,
    );

    request.refreshedToken = token;
    next();
}
