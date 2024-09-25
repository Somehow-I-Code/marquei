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
        id: number,
        companyId: number | undefined,
        newState: boolean,
    ) {
        const updatedProfile = await prisma.profile.update({
            where: {
                id,
                companyId,
            },
            data: {
                isActive: newState,
            },
        });

        return updatedProfile;
    }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
