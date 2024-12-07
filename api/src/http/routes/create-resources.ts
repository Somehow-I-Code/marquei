import { FastifyInstance } from "fastify";

import { verify } from "jsonwebtoken";
import { ZodError } from "zod";
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

        let validatedResourceData;

        try {
            validatedResourceData = createResource.parse(request.body);
        } catch (error) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const { name, description, categoryId, companyId } =
            validatedResourceData;

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

