import { FastifyInstance } from "fastify";

import categoriesRepository from "../../repositories/categories";
import { verifyToken } from "../middlewares/verify-token";

export async function getCategories(server: FastifyInstance) {
    server.get(
        "/categories",
        {
            preHandler: [verifyToken],
        },
        async (request, reply) => {
            // const profile = verify(token, secretKey) as {
            //     companyId: number;
            // };

            const categories = await categoriesRepository.findAll(
                // profile.companyId,
                1, // fake companyId trocar quando implementar o middleware
            );

            return reply.send(categories);
        },
    );
}
