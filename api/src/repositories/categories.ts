import { prisma } from "../lib/prisma";
<<<<<<< HEAD
import { CreateCategoryInput } from "../validators/categories";
=======
import { CreateCategoryInput } from "./../validators/categories";
>>>>>>> main

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
