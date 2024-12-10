import {
    companiesRepository,
    CompaniesRepositoryType,
} from "@repositories/companies";
import { CreateCompanyInput } from "@validators/companies";

class CompaniesServices {
    constructor(private companiesRepository: CompaniesRepositoryType) {}

    async getAll() {
        const companies = await this.companiesRepository.findAll();

        return companies;
    }

    async create(data: CreateCompanyInput) {
        const company = await this.companiesRepository.create(data);

        return company;
    }
}

export const companiesServices = new CompaniesServices(companiesRepository);
export type CompaniesServicesType = typeof companiesServices;
