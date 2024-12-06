export type Category = {
    id: number;
    name: string;
    companyId: number;
};

export type CategoriesResponse = {
    categories: Array<
        Category & {
            createdAt: string;
            updatedAt: string;
        }
    >;
};
