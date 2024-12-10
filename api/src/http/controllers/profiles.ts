import {
    refreshedTokenRequest,
    userIdentifiedRequest,
} from "@middlewares/validator/requests";
import { CREATED, SUCCESS } from "@routes/utils/http-codes";
import { profilesService, ProfilesServiceType } from "@services/profiles";
import {
    createProfileSchema,
    deleteProfileSchema,
    toggleProfileSchema,
} from "@validators/profiles";
import { validate } from "@validators/validate";
import { FastifyReply, FastifyRequest } from "fastify";
import { CatchErrors } from "./utils/catch-errors";

class ProfilesController {
    constructor(private profilesService: ProfilesServiceType) {
        this.all = this.all.bind(this);
        this.create = this.create.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.levels = this.levels.bind(this);
        this.delete = this.delete.bind(this);
    }

    index(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);

        const { password, ...profileWithoutPassword } = profile;

        return reply.status(SUCCESS).send({ profile: profileWithoutPassword });
    }

    @CatchErrors()
    async all(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);

        const profiles = await this.profilesService.all(profile);

        return reply.status(SUCCESS).send({ profiles });
    }

    @CatchErrors()
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { profile, refreshedToken } = validate(
            request,
            refreshedTokenRequest,
        );
        const data = validate(request.body, createProfileSchema);

        const newProfile = await this.profilesService.create(profile, data);

        return reply
            .status(CREATED)
            .send({ profile: newProfile, refreshedToken });
    }

    @CatchErrors()
    async activate(request: FastifyRequest, reply: FastifyReply) {
        return await this.toggleProfile(request, reply, true);
    }

    @CatchErrors()
    async deactivate(request: FastifyRequest, reply: FastifyReply) {
        return await this.toggleProfile(request, reply, false);
    }

    @CatchErrors()
    async levels(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);
        const levels = await this.profilesService.getLevels(profile);

        return reply.status(SUCCESS).send({ levels });
    }

    @CatchErrors()
    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { profile, refreshedToken } = validate(
            request,
            refreshedTokenRequest,
        );
        const { profileId } = validate(request.params, deleteProfileSchema);

        const deletedProfile = await this.profilesService.delete(
            profile,
            profileId,
        );

        return reply.status(SUCCESS).send({
            profile: deletedProfile,
            refreshedToken,
        });
    }

    private async toggleProfile(
        request: FastifyRequest,
        reply: FastifyReply,
        newProfileState: boolean,
    ) {
        const { profile, refreshedToken } = validate(
            request,
            refreshedTokenRequest,
        );
        const { profileId } = validate(request.params, toggleProfileSchema);

        const updatedProfile = await this.profilesService.toggleProfile(
            profile,
            profileId,
            newProfileState,
        );

        return reply
            .status(SUCCESS)
            .send({ profile: updatedProfile, refreshedToken });
    }
}

export const profilesController = new ProfilesController(profilesService);
