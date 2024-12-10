import { Level } from "@prisma/client";
import { hash } from "bcrypt";

import { prisma } from "@lib/prisma";
import generatePassword from "@repositories/utils/generateRandomPassword";
import emailService from "@services/email";
import { CreateProfileInput } from "@validators/profiles";

class ProfilesRepository {
    async create(data: CreateProfileInput) {
        const password = generatePassword();
        const passwordHash = await hash(password, 10);

        const profile = await prisma.profile.create({
            data: {
                ...data,
                password: passwordHash,
            },
        });

        emailService.sendEmailWithPassword(data.email, password);

        return profile;
    }

    async findByEmail(email: string) {
        const profile = await prisma.profile.findUnique({
            where: {
                email,
            },
        });

        return profile;
    }

    async findById(id: number) {
        const profile = await prisma.profile.findUnique({
            where: {
                id,
            },
        });

        return profile;
    }

    async updatePassword(id: number, newPassword: string) {
        const passwordHash = await hash(newPassword, 10);
        const updatedProfile = await prisma.profile.update({
            where: {
                id,
            },
            data: {
                password: passwordHash,
                firstLogin: false,
                updatedAt: new Date(Date.now()),
            },
        });

        return updatedProfile;
    }

    async toggleProfile(
        currentUser: { level: Level },
        id: number,
        companyId: number | undefined,
        newState: boolean,
    ) {
        const filter: { [key in Level]?: Level[] } = {
            ADMIN: ["SUDO"],
            SUDO: [],
        };

        const updatedProfile = await prisma.profile.update({
            where: {
                id,
                companyId,
                level: {
                    notIn: filter[currentUser.level],
                },
            },
            data: {
                isActive: newState,
            },
        });

        return updatedProfile;
    }

    async findAll(companyId: number | undefined, level: Level) {
        const filters: { [key in Level]?: Level[] } = {
            ADMIN: ["SUDO"],
            SUDO: [],
        };

        const profiles = await prisma.profile.findMany({
            where: {
                companyId,
                level: {
                    notIn: filters[level],
                },
            },
            orderBy: {
                id: "asc",
            },
        });

        return profiles;
    }

    async delete(level: Level, id: number, companyId: number | undefined) {
        const filters: { [key in Level]?: Level[] } = {
            ADMIN: ["SUDO"],
            SUDO: [],
        };

        const deletedProfile = await prisma.profile.delete({
            select: { id: true },
            where: {
                id,
                companyId,
                level: {
                    notIn: filters[level],
                },
            },
        });

        return deletedProfile;
    }
}

export const profilesRepository = new ProfilesRepository();
export type ProfilesRepositoryType = typeof profilesRepository;
export default profilesRepository;
