import { CreateCompanyInput } from "@validators/companies";
import { prisma } from "../lib/prisma";

class CompaniesRepository {
    async create(data: CreateCompanyInput) {
        const company = await prisma.company.create({
            data,
        });

        return company;
    }

    async findAll() {
        const companies = await prisma.company.findMany();

        return companies;
    }
}

export const companiesRepository = new CompaniesRepository();
export type CompaniesRepositoryType = typeof companiesRepository;
export default companiesRepository;
