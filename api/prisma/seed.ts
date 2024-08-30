import { faker } from "@faker-js/faker";
import { Company, Level, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function createCompanies(): Promise<[Company, Company[]]> {
    const company = await prisma.company.create({
        data: {
            name: "Marquei",
            isActive: true,
        },
    });

    const randomCompanies = Array.from({ length: 10 }, () => ({
        name: faker.company.name(),
        isActive: true,
    }));

    const companies = await prisma.$transaction(
        randomCompanies.map((company) =>
            prisma.company.create({ data: company }),
        ),
    );

    return [company, companies];
}

async function createProfiles(marquei: Company, otherCompanies: Company[]) {
    const password = await hash("1234567890", 10);

    const fixedProfiles = await prisma.profile.createMany({
        data: [
            {
                name: faker.person.fullName(),
                email: "sudo@marquei.com",
                password,
                level: "SUDO",
                occupation: faker.person.jobType(),
                companyId: marquei.id,
            },
            {
                name: faker.person.fullName(),
                email: "admin@marquei.com",
                password,
                level: "ADMIN",
                occupation: faker.person.jobType(),
                companyId: marquei.id,
            },
            {
                name: faker.person.fullName(),
                email: "user@marquei.com",
                password,
                level: "USER",
                occupation: faker.person.jobType(),
                companyId: marquei.id,
            },
        ],
    });

    const randomProfiles = Array.from({ length: 80 }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password,
        level: faker.helpers.arrayElement<Level>(["ADMIN", "USER"]),
        occupation: faker.person.jobType(),
        companyId: faker.helpers.arrayElement(otherCompanies).id,
    }));

    const profiles = await prisma.$transaction(
        randomProfiles.map((profile) =>
            prisma.profile.create({ data: profile }),
        ),
    );

    return [fixedProfiles, profiles];
}

async function main() {
    const [company, companies] = await createCompanies();
    await createProfiles(company, companies);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
