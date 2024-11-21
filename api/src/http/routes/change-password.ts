import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import profileRepository from "../../repositories/profiles";
import { changePasswordSchema } from "../../validators/change-password";
import { getToken } from "../routes/utils/get-token";
import { ChangePasswordInput } from "./../../validators/change-password";
import { getJwtSecret } from "./utils/get-jwt-secret";
import httpCodes from "./utils/http-codes";

export async function changePassword(server: FastifyInstance) {
    const midleware1 = (request, reply, next) => {
        console.log("midleware1");
        next();
    };
    
    server.patch(
        "/change-password",
        { preHandler: [midleware1] },
        async (request, reply) => {
            const token = getToken(request.headers);
            const secretKey = getJwtSecret();

            if (!token) {
                return reply.send({ message: "Token inválido!" });
            }

            const decoded = jwt.verify(token, secretKey) as {
                id: number;
                firstLogin: boolean;
            };

            let changePassword: ChangePasswordInput;

            try {
                changePassword = changePasswordSchema.parse(request.body);
            } catch (error) {
                return reply.status(httpCodes.BAD_REQUEST).send({
                    message: (error as ZodError).issues[0].message,
                });
            }

            const profile = await profileRepository.findById(decoded.id, true);

            if (!profile) {
                return reply
                    .status(httpCodes.NOT_FOUND)
                    .send({ message: "Usuário não encontrado!" });
            }

            const { currentPassword, newPassword, repeatPassword } =
                changePassword;

            if (decoded.firstLogin === false) {
                if (!currentPassword) {
                    return reply
                        .status(httpCodes.BAD_REQUEST)
                        .send({ message: "É obrigatório senha atual!" });
                }

                const passwordMatch = await bcrypt.compare(
                    currentPassword,
                    profile.password,
                );

                if (!passwordMatch) {
                    return reply
                        .status(httpCodes.UNAUTHORIZED)
                        .send({ message: "Senha atual incorreta." });
                }

                if (currentPassword === newPassword) {
                    return reply.status(httpCodes.BAD_REQUEST).send({
                        message:
                            "A nova senha não pode ser igual à senha antiga.",
                    });
                }
            }

            const newPasswordMatch = await bcrypt.compare(
                newPassword,
                profile.password,
            );

            if (newPasswordMatch) {
                return reply.status(httpCodes.BAD_REQUEST).send({
                    message: "A nova senha não pode ser igual à senha antiga.",
                });
            }

            if (newPassword !== repeatPassword) {
                return reply.status(httpCodes.BAD_REQUEST).send({
                    message:
                        "A sua confirmação de senha não bate com a nova senha.",
                });
            }

            const updatedProfile = await profileRepository.updatePassword(
                profile.id,
                newPassword,
            );

            const refreshedToken = jwt.sign(
                {
                    id: updatedProfile.id,
                    email: updatedProfile.email,
                    level: updatedProfile.level,
                    companyId: updatedProfile.companyId,
                    firstLogin: updatedProfile.firstLogin,
                },
                secretKey,
            );

            return reply
                .status(httpCodes.SUCCESS)
                .send({ token: refreshedToken });
        },
    );
}
