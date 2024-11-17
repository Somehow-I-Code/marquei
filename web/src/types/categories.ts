export type Category = {
    id: number;
    name: string;
    companyId: number;
};

export type CategoriesResponse = Array<
    Category & {
        createdAt: string;
        updatedAt: string;
    }
>;
