import { faker } from "@faker-js/faker";
import { Company } from "@prisma/client";

import { prisma } from "../../src/lib/prisma";
import { CreateCategoryInput } from "../../src/validators/categories";

function createRandomCategories(amount: number, companyId: number) {
    return Array.from({ length: amount }, () => ({
        name: faker.commerce.department(),
        companyId,
    }));
}

async function saveRandomCategories(categories: Array<CreateCategoryInput>) {
    const savedCategories = await prisma.$transaction(
        categories.map((category) =>
            prisma.category.create({ data: category }),
        ),
    );

    return savedCategories;
}

async function createCategoriesForCompany(company: Company) {
    const categoriesCount = faker.number.int({ min: 1, max: 4 });

    const randomCategories = createRandomCategories(
        categoriesCount,
        company.id,
    );

    const savedCategories = await saveRandomCategories(randomCategories);

    return savedCategories;
}

export default async function seedCategories(allCompanies: Array<Company>) {
    faker.seed(123);

    const allCategories = await Promise.all(
        allCompanies.map(async (company) => {
            const category = await createCategoriesForCompany(company);

            return category;
        }),
    );

    return allCategories.flat();
}
