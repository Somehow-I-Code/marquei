import { refreshedTokenRequest } from "@middlewares/validator/requests";
import { CREATED, SUCCESS } from "@routes/utils/http-codes";
import { companiesServices, CompaniesServicesType } from "@services/companies";
import { createCompanySchema } from "@validators/companies";
import { validate } from "@validators/validate";
import { FastifyReply, FastifyRequest } from "fastify";
import { CatchErrors } from "./utils/catch-errors";

class CompaniesController {
    constructor(private companiesServices: CompaniesServicesType) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    @CatchErrors()
    async index(request: FastifyRequest, reply: FastifyReply) {
        const companies = await this.companiesServices.getAll();

        return reply.status(SUCCESS).send({ companies });
    }

    @CatchErrors()
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { refreshedToken } = validate(request, refreshedTokenRequest);
        const data = validate(request.body, createCompanySchema);

        const company = await this.companiesServices.create(data);

        return reply.status(CREATED).send({ company, refreshedToken });
    }
}

export const companiesController = new CompaniesController(companiesServices);
