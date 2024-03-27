import { prisma } from "../lib/prisma";
import { CreateCategoryInput } from "./../validators/categories";

class CategoriesRepository {
    async create({ title }: CreateCategoryInput) {
        const category = await prisma.category.create({
            data: {
                title,
            },
        });

        return category;
    }

    async findAll() {
        const categories = await prisma.category.findMany({
            include: {
                Resource: true,
            },
        });

        return categories;
    }
}

const categoriesRepository = new CategoriesRepository();
export default categoriesRepository;
