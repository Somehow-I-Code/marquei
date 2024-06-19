import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import {
    ResetPassword,
    resetPasswordSchema,
} from "../../validators/reset-password";

const _1_HOUR = 1000 * 60 * 60;

export async function resetPassword(server: FastifyInstance) {
    server.post("/reset-password", async (request, reply) => {
        if (process.env.JWT_SECRET === undefined) {
            return reply
                .status(500)
                .send({ message: "JWT SECRET não configurado" });
        }

        let resetPasswordEmail: ResetPassword;

        resetPasswordEmail = resetPasswordSchema.parse(request.body);

        const { email } = resetPasswordEmail;

        const profile = await profileRepository.findByEmail(email);

        if (!profile) {
            return reply.status(404).send({ message: "Email não encontrado" });
        }

        const token = jwt.sign(
            {
                id: profile.id,
                email: profile.email,
                expiresAt: Date.now() + _1_HOUR,
            },
            process.env.JWT_SECRET,
        );
        return reply.code(200).send({ token });
    });
}
