import { FastifyInstance } from "fastify";

import resourcesRepository from "../../repositories/resources";
import { createResource } from "../../validators/resources";
import { getToken } from "./utils/get-token";
import { verify } from "jsonwebtoken";
import { getJwtSecret } from "./utils/get-jwt-secret";
import httpCodes from "./utils/http-codes";

export async function createResources(server: FastifyInstance) {
    server.post("/resources", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.status(httpCodes.BAD_REQUEST).send({ message: "Token inválido!" });
        }

        const { name, description, categoryId, companyId } =
            createResource.parse(request.body);

        const profile = verify(token, secretKey) as {
            companyId: number;
        };

        if (profile.companyId !== companyId) {
            return reply.status(httpCodes.UNAUTHORIZED).send({
                message: "Você não tem permissão para executar esta operação!",
            });
        }

        const resource = await resourcesRepository.create({
            name,
            description,
            categoryId,
            companyId,
        });

        return reply.status(httpCodes.CREATED).send(resource);
    });
}
