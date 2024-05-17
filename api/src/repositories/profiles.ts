import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";
import emailService from "../services/email";
import { CreateProfileInput } from "../validators/profile";
import generatePassword from "./utils/generateRandomPassword";

class ProfileRepository {
    async create({ name, occupation, email, level }: CreateProfileInput) {
        const password = generatePassword();
        const passwordHash = await hash(password, 10);

        emailService.sendEmailWithPassword(password);

        const profile = await prisma.profile.create({
            data: {
                name,
                occupation,
                email,
                password: passwordHash,
                level,
            },
        });

        return profile;
    }

    async find(email: string) {
        const user = await prisma.profile.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
