import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import z from "zod";
import profileRepository from "../../repositories/profiles";
import { LoginInput, loginSchema } from "../../validators/login-form";
import { getJwtSecret } from "./utils/get-jwt-secret";

export async function login(server: FastifyInstance) {
    server.post("/login", async (request, reply) => {
        const secretKey = getJwtSecret();

        let credentials: LoginInput;

        try {
            credentials = loginSchema.parse(request.body);
        } catch (error) {
            return reply.status(400).send({
                error: "ValidationError",
                message: (error as z.ZodError).issues[0].message,
            });
        }

        const { email, password } = credentials;
        const profile = await profileRepository.findByEmail(email);

        if (!profile) {
            return reply.status(401).send({ message: "Credenciais inválidas." });
        }

        const passwordMatch = await bcrypt.compare(password, profile.password);

        if (!passwordMatch) {
            return reply.status(401).send({ message: "Credenciais inválidas." });
        }

        const token = jwt.sign(
            {
                id: profile.id,
                email: profile.email,
                level: profile.level,
                companyId: profile.companyId,
                firstLogin: profile.firstLogin,
            },
            secretKey,
        );

        return reply.status(200).send({ token });
    });
}
