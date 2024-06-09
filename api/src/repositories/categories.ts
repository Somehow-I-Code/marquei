import { prisma } from "../lib/prisma";
import { CreateCategoryInput } from "../validators/categories";

class CategoriesRepository {
    async create({ title }: CreateCategoryInput) {
        const category = await prisma.category.create({
            data: {
                title,
                companyId: 1,
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
