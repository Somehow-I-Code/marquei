import { FastifyReply, FastifyRequest } from "fastify";

import {
    refreshedTokenRequest,
    userIdentifiedRequest,
} from "@middlewares/validator/requests";
import { CREATED, SUCCESS } from "@routes/utils/http-codes";
import { categoriesService, CategoriesServiceType } from "@services/categories";
import { createCategorySchema } from "@validators/categories";
import { validate } from "@validators/validate";
import { CatchErrors } from "./utils/catch-errors";

class CategoriesController {
    constructor(private categoriesService: CategoriesServiceType) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    @CatchErrors()
    async index(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);

        const categories = await this.categoriesService.getAll(profile);

        return reply.status(SUCCESS).send({ categories });
    }

    @CatchErrors()
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { profile, refreshedToken } = validate(
            request,
            refreshedTokenRequest,
        );
        const data = validate(request.body, createCategorySchema);

        const category = await this.categoriesService.create(profile, data);

        return reply.status(CREATED).send({ category, refreshedToken });
    }
}

export const categoriesController = new CategoriesController(categoriesService);
