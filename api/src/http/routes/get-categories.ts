import { FastifyInstance } from "fastify";
import categoriesRepository from "../../repositories/categories";
import { findLoggedUser } from "../middlewares/find-logged-user";
import { LoggedRequest } from "../middlewares/types/request";
import { verifyToken } from "../middlewares/verify-token";
import httpCodes from "./utils/http-codes";

export async function getCategories(server: FastifyInstance) {
    server.get(
        "/categories",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        async (request: LoggedRequest, reply) => {
            const { profile } = request;

            if (!profile) {
                return reply.status(httpCodes.UNAUTHORIZED).send({
                    message: "Perfil logado inválido ",
                });
            }

            const categories = await categoriesRepository.findAll(
                profile.companyId,
            );

            return reply.send(categories);
        },
    );
}
