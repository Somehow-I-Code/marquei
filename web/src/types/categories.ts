export type Category = {
    id: number;
    title: string;
};

export type CategoriesResponse = Array<
    Category & {
        createdAt: string;
        updatedAt: string;
    }
>;
