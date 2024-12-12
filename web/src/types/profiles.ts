export type Profile = {
    id: number;
    name: string;
    occupation: string;
    email: string;
    level: string;
    companyId: number;
    firstLoign: boolean;
    isActive: boolean;
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

export type DecodedProfile = FullProfile & {
    iat: number;
    exp: number;
};
