import { FastifyInstance } from "fastify";

import categoriesRepository from "../../repositories/categories";
import { createCategory } from "../../validators/categories";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { verify } from "jsonwebtoken";

export async function createCategories(server: FastifyInstance) {
    server.post("/categories", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        const { name, companyId } = createCategory.parse(request.body);

        const profile = verify(token, secretKey) as {
            companyId: number;
        };

        if (profile.companyId !== companyId) {
            return reply.status(401).send({
                message: "Você não tem permissão para executar esta operação!",
            });
        }

        const category = await categoriesRepository.create({
            name,
            companyId,
        });

        return reply.status(201).send(category);
    });
}
