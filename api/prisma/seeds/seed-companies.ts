import { faker } from "@faker-js/faker";

import { prisma } from "../../src/lib/prisma";
import { CreateCompanyInput } from "../../src/validators/company";

const RANDOM_COMPANIES_COUNT = 10;

async function createAdminCompany() {
    const company = await prisma.company.create({
        data: {
            name: "Marquei",
            isActive: true,
        },
    });

    return company;
}

function createRandomCompany(ammount: number) {
    return Array.from({ length: ammount }, () => ({
        name: faker.company.name(),
        isActive: true,
    }));
}

async function saveRandomCompanies(companies: Array<CreateCompanyInput>) {
    const randomCompanies = await prisma.$transaction(
        companies.map((company) => prisma.company.create({ data: company })),
    );

    return randomCompanies;
}

export default async function seedCompanies() {
    faker.seed(123);

    const adminCompany = await createAdminCompany();

    const randomCompanies = createRandomCompany(RANDOM_COMPANIES_COUNT);

    const companies = await saveRandomCompanies(randomCompanies);

    return {
        adminCompany,
        companies,
        allCompanies: [adminCompany, ...companies],
    };
}
