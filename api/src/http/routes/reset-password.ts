import { FastifyInstance } from "fastify";
import profileRepository from "../../repositories/profiles";
import {
    ResetPassword,
    resetPasswordSchema,
} from "../../validators/reset-password";

export async function resetPassword(server: FastifyInstance) {
    server.post("/reset-password", async (request, reply) => {
        let resetPasswordEmail: ResetPassword;

        resetPasswordEmail = resetPasswordSchema.parse(request.body);

        const { email } = resetPasswordEmail;

        const user = await profileRepository.findByEmail(email);

        if (!user) {
            return reply.status(404).send({ error: "Email não encontrado" });
        }
    });
}


