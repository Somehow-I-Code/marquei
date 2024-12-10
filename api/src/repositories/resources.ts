import { prisma } from "../lib/prisma";
import { CreateResourcesInput } from "./../validators/resources";

class ResourcesRepository {
    async create({
        name,
        description,
        categoryId,
        companyId,
    }: CreateResourcesInput) {
        const resource = await prisma.resource.create({
            data: {
                name,
                description,
                categoryId,
                companyId,
            },
        });

        return resource;
    }

    async findAll(companyId: number) {
        const resources = await prisma.resource.findMany({
            where: {
                companyId,
            },
            include: {
                category: true,
            },
        });

        return resources;
    }
}

export const resourcesRepository = new ResourcesRepository();
export type ResourcesRepositoryType = typeof resourcesRepository;
export default resourcesRepository;
