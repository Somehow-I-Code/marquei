import { prisma } from "../lib/prisma";
import { CreateResourceInput } from "./../validators/resources";

class ResourcesRepository {
  async create({ name, description, categoryId }: CreateResourceInput) {
    const resource = await prisma.resource.create({
      data: {
        name,
        description,
        categoryId,
      },
    });

    return resource;
  }

  async findAll() {
    const resources = await prisma.resource.findMany({
      include: {
        Category: true,
      },
    });

    return resources;
  }
}

const resourcesRepository = new ResourcesRepository();
export default resourcesRepository;
