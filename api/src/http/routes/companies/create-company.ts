import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import { ZodError } from "zod";
import companyRepository from "../../repositories/company";
import { createCompanySchema } from "./../../validators/company";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { getToken } from "./utils/get-token";
import httpCodes from "./utils/http-codes";

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

        let validatedCompanyData;

        try {
            validatedCompanyData = createCompanySchema.parse(request.body);
        } catch (error) {
            return reply.status(httpCodes.BAD_REQUEST).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const { name, isActive, city, nickname, representativeName } =
            validatedCompanyData;

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

