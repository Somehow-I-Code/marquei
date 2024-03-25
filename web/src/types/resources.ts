export type Resource = {
    name: string;
    description: string;
    category: string;
};

export type ResourceResponse = Array<{
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    Category: {
        id: number;
        title: string;
        createdAt: string;
        updatedAt: string;
    };
}>;

export type Resources = Array<Resource>;
