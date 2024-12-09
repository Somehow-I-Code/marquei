import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

import categoriesRepository from "../../repositories/categories";
import { findLoggedUser } from "../middlewares/find-logged-user";
import { LoggedRequest } from "../middlewares/types/request";
import { userIdentifiedRequest } from "../middlewares/validator/requests";
import { verifyToken } from "../middlewares/verify-token";

export async function getCategories(server: FastifyInstance) {
    server.get(
        "/categories",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        async (request: LoggedRequest, reply) => {
            let validatedRequest;

            try {
                validatedRequest = userIdentifiedRequest.parse(request);
            } catch (error) {
                return reply.status(400).send({
                    message: (error as ZodError).issues[0].message,
                });
            }

            const { profile } = validatedRequest;

            const categories = await categoriesRepository.findAll(
                profile.companyId,
            );

            return reply.send({ categories });
        },
    );
}
