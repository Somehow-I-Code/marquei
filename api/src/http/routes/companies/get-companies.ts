import { FastifyInstance } from "fastify";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { verify } from "jsonwebtoken";
import { Level } from "@prisma/client";
import companyRepository from "../../repositories/company";

export async function getCompanies(server: FastifyInstance) {
    server.get("/companies", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        const profile = verify(token, secretKey) as {
            level: Level;
            companyId: number;
        };
        
        const companies = await companyRepository.find(
            profile.level,
            profile.companyId,
        );

        return reply.send(companies);
    })
    
}