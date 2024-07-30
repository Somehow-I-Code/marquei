import { FastifyInstance } from "fastify";
import companyRepository from "../../repositories/company";
import { createCompanySchema } from "./../../validators/company";

export async function createCompany(server: FastifyInstance) {
    server.post("/company", async (request, reply) => {
        const { name, isActive } = createCompanySchema.parse(request.body);

        const company = await companyRepository.create({
            name,
            isActive,
        });

        return reply.status(201).send(company);
    });
}
