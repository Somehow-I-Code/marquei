import { Level } from "@prisma/client";
import { hash } from "bcrypt";

import { prisma } from "@lib/prisma";
import generatePassword from "@repositories/utils/generateRandomPassword";
import emailService from "@services/email";
import { CreateProfileInput } from "@validators/profile";

class ProfileRepository {
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
        currenUser: { level: Level },
        id: number,
        companyId: number | undefined,
        newState: boolean,
    ) {
        const filter: { [key in Level]: Level[] } = {
            USER: ["USER", "ADMIN", "SUDO"],
            ADMIN: ["SUDO"],
            SUDO: [],
        };

        const updatedProfile = await prisma.profile.update({
            where: {
                id,
                companyId,
                level: {
                    notIn: filter[currenUser.level],
                },
            },
            data: {
                isActive: newState,
            },
        });

        return updatedProfile;
    }

    async findAll(companyId: number, isSudo: boolean) {
        if (isSudo) {
            return prisma.profile.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    level: true,
                    occupation: true,
                },
            });
        }
        return prisma.profile.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                level: true,
                occupation: true,
            },
            where: {
                companyId,
                level: { not: "SUDO" },
            },
        });
    }

    async delete(id: number, currentUser: { level: Level; companyId: number }) {
        try {
            if (currentUser.level === Level.SUDO) {
                const deletedProfile = await prisma.profile.delete({
                    select: {
                        id: true,
                    },
                    where: {
                        id,
                    },
                });

                return deletedProfile;
            }

            const deletedProfile = await prisma.profile.delete({
                select: {
                    id: true,
                },
                where: {
                    id,
                    companyId: currentUser.companyId,
                    level: {
                        not: Level.SUDO,
                    },
                },
            });

            return deletedProfile;
        } catch {
            return null;
        }
    }
}

export const profileRepository = new ProfileRepository();
export type ProfileRepositoryType = typeof profileRepository;
export default profileRepository;
