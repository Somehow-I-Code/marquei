export type Profile = {
    id: number;
    name: string;
    occupation: string;
    email: string;
    level: string;
};

export type ProfilesResponse = Profile & {
    createdAt: string;
    updatedAt: string;
};
