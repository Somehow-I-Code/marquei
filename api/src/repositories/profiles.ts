import { hash } from "bcrypt";
import { prisma } from "../lib/prisma";
import { CreateProfileInput } from "../validators/profile";
import generatePassword from "./utils/generateRandomPassword";

class ProfileRepository {
    async create({ name, occupation, email, level }: CreateProfileInput) {
        const password = generatePassword();
        const passwordHash = await hash(password, 10);

        console.log(`Pra logar na plataforma use a senha: ${password}`);

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

    // Criando a função findByEmail que irá usar a função findUnique do prisma para encontrar como um valor único o campo email
    async findByEmail(email: string) {
        const profile = await prisma.profile.findUnique({
            where: {
                email,
            },
        });

        return profile;
    }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
