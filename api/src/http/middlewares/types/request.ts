import { FastifyRequest } from "fastify";

export type Request = FastifyRequest & {
    userId?: number;
};
