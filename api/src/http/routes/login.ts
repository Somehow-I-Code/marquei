import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export async function login(server: FastifyInstance) {
    server.post("/login", async (request, reply) => {
        try {
            const { email, password } = loginSchema.parse(request.body);

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                    password: password,
                },
                select: {
                    email: true,
                    password: true,
                },
            });

            if (user) {
                return reply.code(200).send({ message: "Usuário encontrado" });
            } else {
                return reply
                    .code(401)
                    .send({ message: "Usuário não encontrado" });
            }
        } catch (error: any) {
            return reply
                .code(400)
                .send({ error: "Erro de validação: " + error.message });
        }
    });
}
