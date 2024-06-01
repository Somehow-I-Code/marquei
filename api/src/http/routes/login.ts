import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
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
        const profile = await profileRepository.findByEmail(email);

        if (!profile) {
            return reply.code(401).send({ message: "Credenciais inválidas" });
        }

        const passwordMatch = await bcrypt.compare(password, profile.password);

        if (!passwordMatch) {
            return reply.code(401).send({ message: "Credenciais inválidas" });
        }

        const token = jwt.sign(
            { id: profile.id, email: profile.email, level: profile.level },
            process.env.JWT_SECRET,
        );

        return reply.code(200).send({ token });
    });
}
