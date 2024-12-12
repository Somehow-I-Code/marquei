import { Company, Level } from "@prisma/client";
import { prisma } from "../../src/lib/prisma";

import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { CreateProfileInput } from "../../src/validators/profiles";

const DEFAULT_PASSWORD = "1234567890";
const DEFAULT_SALT = 10;
const RANDOM_PROFILES_COUNT = 40;

async function createBaseProfiles(defaultCompany: Company) {
    const password = await hash(DEFAULT_PASSWORD, DEFAULT_SALT);

    const profiles: Array<CreateProfileInput & { password: string }> = [
        {
            name: faker.person.fullName(),
            email: "sudo@marquei.com",
            password,
            level: "SUDO",
            occupation: faker.person.jobType(),
            companyId: defaultCompany.id,
        },
        {
            name: faker.person.fullName(),
            email: "admin@marquei.com",
            password,
            level: "ADMIN",
            occupation: faker.person.jobType(),
            companyId: defaultCompany.id,
        },
        {
            name: faker.person.fullName(),
            email: "user@marquei.com",
            password,
            level: "USER",
            occupation: faker.person.jobType(),
            companyId: defaultCompany.id,
        },
    ];

    const savedProfiles = await prisma.$transaction(
        profiles.map((profile) => prisma.profile.create({ data: profile })),
    );

    return savedProfiles;
}

async function createRandomProfiles(amount: number, otherCompanies: Company[]) {
    const password = await hash(DEFAULT_PASSWORD, DEFAULT_SALT);

    return Array.from({ length: amount }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password,
        level: faker.helpers.arrayElement<Level>(["ADMIN", "USER"]),
        occupation: faker.person.jobType(),
        companyId: faker.helpers.arrayElement(otherCompanies).id,
    }));
}

async function saveRandomProfiles(
    profiles: Array<CreateProfileInput & { password: string }>,
) {
    return prisma.$transaction(
        profiles.map((profile) => prisma.profile.create({ data: profile })),
    );
}

export default async function seedProfiles(
    defaultCompany: Company,
    otherCompanies: Company[],
) {
    faker.seed(123);

    const baseProfiles = await createBaseProfiles(defaultCompany);

    const randomProfiles = await createRandomProfiles(
        RANDOM_PROFILES_COUNT,
        otherCompanies,
    );

    const profiles = await saveRandomProfiles(randomProfiles);

    return [...baseProfiles, ...profiles];
}
