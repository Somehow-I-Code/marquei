import { SERVER_ERROR, UNAUTHORIZED } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { JsonWebTokenError } from "jsonwebtoken";

export function globalErrorHandler(
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply,
) {
    console.error(error);

    if (error instanceof HttpError) {
        return reply.status(error.code).send({ message: error.message });
    }

    if (error instanceof JsonWebTokenError) {
        return reply.status(UNAUTHORIZED).send({ message: "Token inválido" });
    }

    return reply
        .status(SERVER_ERROR)
        .send({ message: "Internal Server Error" });
}
