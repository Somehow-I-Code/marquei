import { FastifyReply, FastifyRequest } from "fastify";

import { SERVER_ERROR } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";

export function CatchErrors() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (
            request: FastifyRequest,
            reply: FastifyReply,
        ) {
            try {
                await originalMethod.call(this, request, reply);
            } catch (error) {
                console.error(error);

                if (error instanceof HttpError) {
                    reply.status(error.code).send({ message: error.message });
                } else {
                    reply
                        .status(SERVER_ERROR)
                        .send({ message: "Erro interno do servidor" });
                }
            }
        };
    };
}
