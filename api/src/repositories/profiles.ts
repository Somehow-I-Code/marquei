import { Level } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";
import emailService from "../services/email";
import { CreateProfileInput } from "../validators/profile";
import generatePassword from "./utils/generateRandomPassword";

class ProfileRepository {
    async create({
        name,
        occupation,
        email,
        level,
        companyId,
    }: CreateProfileInput) {
        const password = generatePassword();
        const passwordHash = await hash(password, 10);

        const profile = await prisma.profile.create({
            data: {
                name,
                occupation,
                email,
                password: passwordHash,
                level,
                companyId,
            },
        });

        emailService.sendEmailWithPassword(email, password);

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

    async findById(id: number, includePassword = false) {
        const profile = await prisma.profile.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                occupation: true,
                email: true,
                level: true,
                password: includePassword,
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
            return prisma.profile.findMany();
        }
        return prisma.profile.findMany({
            where: {
                companyId,
                level: { not: "SUDO" },
            },
        });
    }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
