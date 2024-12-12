import { signAuthToken } from "@http/utils/sign-auth-token";
import HttpError from "@routes/utils/http-error";
import { FastifyReply } from "fastify";
import httpCodes from "../routes/utils/http-codes";
import { LoggedRequest } from "./types/request";
import { userIdentifiedRequest } from "./validator/requests";

export function refreshToken(
    request: LoggedRequest,
    reply: FastifyReply,
    next: (err?: Error) => void,
) {
    try {
        const { profile } = userIdentifiedRequest.parse(request);

        const token = signAuthToken(profile);

        request.refreshedToken = token;
        next();
    } catch (e) {
        if (e instanceof HttpError) {
            return reply.status(e.code).send({ message: e.message });
        }

        return reply
            .status(httpCodes.SERVER_ERROR)
            .send({ message: "Erro interno do servidor" });
    }
}
