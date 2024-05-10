import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import usersRepository from "../../repositories/users";
import { LoginInput, loginSchema } from "../../validators/login-form";

export async function login(server: FastifyInstance) {
    server.post("/login", async (request, reply) => {
        if (typeof process.env.JWT_SECRET !== "string") {
            return reply
                .code(500)
                .send({ message: "Configuração de token não aplicada" });
        }

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
        const user = await usersRepository.find(email);

        if (!user) {
            return reply.code(401).send({ message: "Credenciais inválidas" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return reply.code(401).send({ message: "Credenciais inválidas" });
        }

        const token = jwt.sign(
            { email: user.email, profileLevel: user.profileLevel },
            process.env.JWT_SECRET,
        );

        return reply.code(200).send({ token });
    });
}

