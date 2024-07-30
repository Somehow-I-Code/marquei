import { prisma } from "../lib/prisma";
import { CreateCompanyInput } from "../validators/company";

class CompanyRepository {
    async create({ name, isActive }: CreateCompanyInput) {
        const company = await prisma.company.create({
            data: {
                name,
                isActive,
            },
        });

        return company;
    }
}

const companyRepository = new CompanyRepository();
export default companyRepository;
