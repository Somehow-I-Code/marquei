export type Profile = {
    id: number;
    name: string;
    occupation: string;
    email: string;
    level: string;
    companyId: number;
};

export type ProfilesResponse = Profile & {
    createdAt: string;
    updatedAt: string;
};
