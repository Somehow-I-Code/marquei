import { prisma } from "../lib/prisma";
import { LoginInput } from "../validators/login-form";

class UsersRepository {
    async find({ email }: LoginInput) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}

const usersRepository = new UsersRepository();
export default usersRepository;

