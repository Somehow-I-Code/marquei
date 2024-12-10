import { prisma } from "../lib/prisma";
import { CreateCategoryInput } from "../validators/categories";

class CategoriesRepository {
    async create({ name, companyId }: CreateCategoryInput) {
        const category = await prisma.category.create({
            data: {
                name,
                companyId,
            },
        });

        return category;
    }

    async findAll(companyId: number) {
        const categories = await prisma.category.findMany({
            where: {
                companyId,
            },
        });

        return categories;
    }
}

export const categoriesRepository = new CategoriesRepository();
export type CategoriesRepositoryType = typeof categoriesRepository;
export default categoriesRepository;
