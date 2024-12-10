import { Level, Profile } from "@prisma/client";
import {
    profilesRepository,
    ProfilesRepositoryType,
} from "@repositories/profiles";
import { NOT_FOUND, UNAUTHORIZED } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";
import { CreateProfileInput } from "@validators/profiles";

class ProfilesService {
    constructor(private profilesRepository: ProfilesRepositoryType) {}

    async all(profile: Profile) {
        const companyId =
            profile.level === Level.SUDO ? undefined : profile.companyId;

        const profiles = await this.profilesRepository.findAll(
            companyId,
            profile.level,
        );

        const profilesWithoutPassword = profiles.map(({ password, ...p }) => p);

        return profilesWithoutPassword;
    }

    async create(profile: Profile, data: CreateProfileInput) {
        const isAdmin = profile.level === Level.ADMIN;
        const isInTheSameCompany = profile.companyId === data.companyId;
        const newUserIsSudo = data.level === Level.SUDO;

        if (isAdmin && (!isInTheSameCompany || newUserIsSudo)) {
            throw new HttpError(
                UNAUTHORIZED,
                "Você não tem permissão para executar esta operação!",
            );
        }

        const { password, ...newProfile } =
            await this.profilesRepository.create(data);

        return newProfile;
    }

    async toggleProfile(
        profile: Profile,
        profileId: number,
        newProfileState: boolean,
    ) {
        const companyId =
            profile.level === Level.SUDO ? undefined : profile.companyId;

        try {
            const { password, ...updatedProfile } =
                await this.profilesRepository.toggleProfile(
                    profile,
                    profileId,
                    companyId,
                    newProfileState,
                );

            return updatedProfile;
        } catch (e) {
            throw new HttpError(
                UNAUTHORIZED,
                "Você não tem permissão para executar esta operação!",
            );
        }
    }

    async getLevels(profile: Profile) {
        const levels = Object.keys(Level);

        if (profile.level === Level.SUDO) {
            return levels;
        }

        return levels.filter((level) => level !== Level.SUDO);
    }

    async delete(profile: Profile, profileId: number) {
        const companyId =
            profile.level === Level.SUDO ? undefined : profile.companyId;

        try {
            const deletedProfile = await this.profilesRepository.delete(
                profile.level,
                profileId,
                companyId,
            );

            return deletedProfile;
        } catch (e) {
            throw new HttpError(NOT_FOUND, "Perfil não encontrado!");
        }
    }
}

export const profilesService = new ProfilesService(profilesRepository);
export type ProfilesServiceType = typeof profilesService;
