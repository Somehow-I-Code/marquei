import { prisma } from "../lib/prisma";
import { CreateResourceInput } from "./../validators/resources";

class ResourcesRepository {
    async create({
        name,
        description,
        categoryId,
        companyId,
    }: CreateResourceInput) {
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

const resourcesRepository = new ResourcesRepository();
export default resourcesRepository;
