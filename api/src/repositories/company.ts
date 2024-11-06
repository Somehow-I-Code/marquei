import { prisma } from "../lib/prisma";
import { CreateCompanyInput } from "../validators/company";

class CompanyRepository {
    async create({
        name,
        isActive,
        city,
        nickname,
        representativeName,
    }: CreateCompanyInput) {
        const company = await prisma.company.create({
            data: {
                name,
                isActive,
                city,
                nickname,
                representativeName,
            },
        });

        return company;
    }

    async find(level: string, companyId: number) {
        if (level === "SUDO") {
            return await prisma.company.findMany();
        }

        return await prisma.company.findMany({
            where: {
                id: companyId,
            },
        });
    }

}

const companyRepository = new CompanyRepository();
export default companyRepository;
