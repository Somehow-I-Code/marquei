import { FastifyInstance } from "fastify";
import companyRepository from "../../repositories/company";
import { createCompanySchema } from "./../../validators/company";
import httpCodes from "./utils/http-codes";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { verify } from "jsonwebtoken";
import { Level } from "@prisma/client";

export async function createCompany(server: FastifyInstance) {
    server.post("/company", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply
                .status(httpCodes.BAD_REQUEST)
                .send({ message: "Token inválido!" });
        }

        const profile = verify(token, secretKey) as {
            level: Level;
        };

        const { name, isActive, city, nickname, representativeName } =
            createCompanySchema.parse(request.body);

        const isSudo = profile.level === Level.SUDO;

        if (isSudo) {
            const company = await companyRepository.create({
                name,
                isActive,
                city,
                nickname,
                representativeName,
            });

            return reply.status(httpCodes.CREATED).send(company);
        }

        return reply.status(httpCodes.UNAUTHORIZED).send({
            message: "Você não tem permissão para executar esta operação!",
        });
    });
}
