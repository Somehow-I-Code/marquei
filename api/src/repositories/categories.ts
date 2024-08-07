import { prisma } from "../lib/prisma";
import { CreateCategoryInput } from "../validators/categories";

class CategoriesRepository {
    async create({ title, companyId }: CreateCategoryInput) {
        const category = await prisma.category.create({
            data: {
                title,
                companyId,
            },
        });

        return category;
    }

    async findAll() {
        const categories = await prisma.category.findMany();

        return categories;
    }
}

const categoriesRepository = new CategoriesRepository();
export default categoriesRepository;
