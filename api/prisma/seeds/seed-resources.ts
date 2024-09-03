import { faker } from "@faker-js/faker";
import { Category } from "@prisma/client";

import { prisma } from "../../src/lib/prisma";
import { CreateResourceInput } from "../../src/validators/resources";

function createRandomResources(amount: number, category: Category) {
    return Array.from({ length: amount }, () => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        categoryId: category.id,
        companyId: category.companyId,
    }));
}

async function saveRandomResources(resources: Array<CreateResourceInput>) {
    const savedResources = await prisma.$transaction(
        resources.map((resource) => prisma.resource.create({ data: resource })),
    );

    return savedResources;
}

async function createResourcesForCategory(category: Category) {
    const resourcesCount = faker.number.int({ min: 2, max: 10 });

    const randomResources = createRandomResources(resourcesCount, category);

    const savedResources = await saveRandomResources(randomResources);

    return savedResources;
}

export default async function seedResources(allCategories: Array<Category>) {
    faker.seed(123);

    const allResources = await Promise.all(
        allCategories.map(async (category) => {
            const resources = await createResourcesForCategory(category);

            return resources;
        }),
    );

    return allResources.flat();
}
