import { FastifyReply, FastifyRequest } from "fastify";

import {
    refreshedTokenRequest,
    userIdentifiedRequest,
} from "@middlewares/validator/requests";
import { CREATED, SUCCESS } from "@routes/utils/http-codes";
import { resourcesService, ResourcesServiceType } from "@services/resources";
import { createResourcesSchema } from "@validators/resources";
import { validate } from "@validators/validate";
import { CatchErrors } from "./utils/catch-errors";

class ResourcesController {
    constructor(private resourcesService: ResourcesServiceType) {
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    @CatchErrors()
    async index(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);

        const resources = await this.resourcesService.getAll(profile);

        return reply.status(SUCCESS).send({ resources });
    }

    @CatchErrors()
    async create(request: FastifyRequest, reply: FastifyReply) {
        console.log("create");
        const { profile, refreshedToken } = validate(
            request,
            refreshedTokenRequest,
        );
        const data = validate(request.body, createResourcesSchema);

        const resource = await this.resourcesService.create(profile, data);

        return reply.status(CREATED).send({ resource, refreshedToken });
    }
}

export const resourcesController = new ResourcesController(resourcesService);
