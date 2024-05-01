import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { LoginInput, loginSchema } from "../../validators/login-form";

export async function login(server: FastifyInstance) {
    server.post("/login", async (request, reply) => {
        let credentials: LoginInput;

        try {
            credentials = loginSchema.parse(request.body);
        } catch (error) {
            return reply.code(400).send({
                error: "ValidationError",
                message: (error as Error).message,
            });
        }

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return reply.code(401).send({ message: "Credenciais inválidas" });
        }

        return reply.code(200).send({ message: "Usuário encontrado" });
    });
}
