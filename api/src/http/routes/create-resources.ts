import { FastifyInstance } from "fastify";

import { verify } from "jsonwebtoken";
import resourcesRepository from "../../repositories/resources";
import { createResource } from "../../validators/resources";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { getToken } from "./utils/get-token";
import httpCodes from "./utils/http-codes";

export async function createResources(server: FastifyInstance) {
    server.post("/resources", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply
                .status(httpCodes.BAD_REQUEST)
                .send({ message: "Token inválido!" });
        }

        const { name, description, categoryId } = createResource.parse(
            request.body,
        );

        const profile = verify(token, secretKey) as {
            companyId: number;
        };

        const resource = await resourcesRepository.create({
            name,
            description,
            categoryId,
            companyId: profile.companyId,
        });

        return reply.status(httpCodes.CREATED).send(resource);
    });
}
