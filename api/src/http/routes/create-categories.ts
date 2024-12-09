import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import { ZodError } from "zod";

import categoriesRepository from "../../repositories/categories";
import { createCategory } from "../../validators/categories";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { getToken } from "./utils/get-token";
import httpCodes from "./utils/http-codes";

export async function createCategories(server: FastifyInstance) {
    server.post("/categories", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply
                .status(httpCodes.BAD_REQUEST)
                .send({ message: "Token inválido!" });
        }

        let validatedCategoryData;

        try {
            validatedCategoryData = createCategory.parse(request.body);
        } catch (error) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const { name } = validatedCategoryData;

        const { companyId } = verify(token, secretKey) as {
            companyId: number;
        };

        const category = await categoriesRepository.create({
            name,
            companyId,
        });

        return reply.status(httpCodes.CREATED).send(category);
    });
}
