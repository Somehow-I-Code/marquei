export type Category = {
    id: number;
    name: string;
};

export type CategoriesResponse = Array<
    Category & {
        createdAt: string;
        updatedAt: string;
    }
>;
