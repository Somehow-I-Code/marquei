export type Resource = {
    id: number;
    name: string;
    description: string;
    category: string;
    companyId: number;
};

export type ResourceResponse = Array<{
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    companyId: number;
    category: {
        id: number;
        name: string;
        companyId: number;
        createdAt: string;
        updatedAt: string;
    };
}>;

export type Resources = Array<Resource>;
