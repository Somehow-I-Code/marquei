import { prisma } from "../lib/prisma";
import { CreateProfileInput } from "../validators/profile";
import generatePassword from "./utils/generateRandomPassword";

class ProfileRepository {
    async create({ name, occupation, email, level }: CreateProfileInput) {
        const profile = await prisma.profile.create({
            data: {
                name,
                occupation,
                email,
                password: generatePassword(),
                level,
            },
        });

        return profile;
    }

    // TODO: update to use schema profile
    async find(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
