export type Resource = {
    name: string;
    description: string;
    category: string;
};

export type ResourceResponse = Array<{
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: {
        id: number;
        title: string;
    };
}>;

export type Resources = Array<Resource>;
