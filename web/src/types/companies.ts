export type Company = {
    id: number;
    name: string;
}

export type CompanyResponse = Company & {
    createdAt: string;
    updatedAt: string;
};

