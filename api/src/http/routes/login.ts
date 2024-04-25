import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function login(server: FastifyInstance) {
    server.post("/login", async (request, reply) => {
        const user = await prisma.user.findUnique({
            where: {
                email: "rafael2606arantes@gmail.com",
                password: "12345678",
            },
            select: {
                email: true,
                password: true,
            },
        });

        if (user) {
            reply.code(200).send({ message: "Usuário encontrado" });
        } else {
            reply.code(404).send({ message: "Usuário não encontrado" });
        }
    });
}
