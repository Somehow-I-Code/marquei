import { prisma } from "../lib/prisma";

class UsersRepository {
    async find(email: string) {
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

