import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import z from "zod";
import profileRepository from "../../repositories/profiles";
import {
    ResetPassword,
    resetPasswordSchema,
} from "../../validators/reset-password";
import emailService from "../../services/email";
import { getJwtSecret } from "./utils/get-jwt-secret";
import httpCodes from "./utils/http-codes";

const _1_HOUR = 1000 * 60 * 60;

export async function resetPassword(server: FastifyInstance) {
    server.post("/reset-password", async (request, reply) => {
        const secretKey = getJwtSecret();

        let resetPasswordEmail: ResetPassword;

        try {
            resetPasswordEmail = resetPasswordSchema.parse(request.body);
        } catch (e) {
            console.log(e);
            return reply.code(httpCodes.BAD_REQUEST).send({
                error: "ValidationError",
                message: (e as z.ZodError).issues[0].message,
            });
        }

        const { email } = resetPasswordEmail;

        const profile = await profileRepository.findByEmail(email);

        if (!profile) {
            return reply.status(httpCodes.NOT_FOUND).send({ message: "Email inválido." });
        }

        const token = jwt.sign(
            {
                id: profile.id,
                email: profile.email,
                expiresAt: Date.now() + _1_HOUR,
            },
            secretKey,
        );
        emailService.sendResetPasswordLink(token);
        return reply.status(httpCodes.SUCCESS).send({ token });
    });
}
