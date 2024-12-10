import { Profile } from "@prisma/client";
import {
    resourcesRepository,
    ResourcesRepositoryType,
} from "@repositories/resources";
import { CreateResourcesInput } from "@validators/resources";

class ResourcesService {
    constructor(private resourcesRepository: ResourcesRepositoryType) {
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
    }

    async getAll(profile: Profile) {
        const resources = await this.resourcesRepository.findAll(
            profile.companyId,
        );

        return resources;
    }

    async create(
        profile: Profile,
        data: Omit<CreateResourcesInput, "companyId">,
    ) {
        const resource = await this.resourcesRepository.create({
            ...data,
            companyId: profile.companyId,
        });

        return resource;
    }
}

export const resourcesService = new ResourcesService(resourcesRepository);
export type ResourcesServiceType = typeof resourcesService;
