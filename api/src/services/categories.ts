import { Profile } from "@prisma/client";
import {
    categoriesRepository,
    CategoriesRepositoryType,
} from "@repositories/categories";

class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepositoryType) {}

    async getAll(profile: Profile) {
        const categories = await this.categoriesRepository.findAll(
            profile.companyId,
        );

        return categories;
    }

    async create(profile: Profile, data: { name: string }) {
        const category = await this.categoriesRepository.create({
            name: data.name,
            companyId: profile.companyId,
        });

        return category;
    }
}

export const categoriesService = new CategoriesService(categoriesRepository);
export type CategoriesServiceType = typeof categoriesService;
