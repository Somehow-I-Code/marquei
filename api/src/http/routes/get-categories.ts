import { verify } from "jsonwebtoken";
import { FastifyInstance } from "fastify";
import categoriesRepository from "../../repositories/categories";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";

export async function getCategories(server: FastifyInstance) {
    server.get("/categories", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.send({ message: "Token inválido!" });
        }

        const profile = verify(token, secretKey) as {
            companyId: number;
        };

        const categories = await categoriesRepository.findAll(
            profile.companyId,
        );

        return reply.send(categories);
    });
}
