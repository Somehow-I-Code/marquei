export type Profile = {
    id: number;
    name: string;
    occupation: string;
    email: string;
    level: string;
    companyId: number;
};

export type FullProfile = Profile & {
    createdAt: string;
    updatedAt: string;
};

export type ProfilesResponse = {
    profile: FullProfile;
};

export type AllProfilesResponse = {
    profiles: Array<FullProfile>;
};
