import { FastifyInstance } from "fastify";

import resourcesRepository from "../../repositories/resources";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { verify } from "jsonwebtoken";

export async function getResources(server: FastifyInstance) {
    server.get("/resources", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.send({ message: "Token inválido!" });
        }

        const profile = verify(token, secretKey) as {
            companyId: number;
        };

        const resources = await resourcesRepository.findAll(profile.companyId);

        return reply.send(resources);
    });
}
