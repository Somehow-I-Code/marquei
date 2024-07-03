import { ChangePasswordInput } from "./../../validators/change-password";
import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { changePasswordSchema } from "../../validators/change-password";
import { ZodError } from "zod";

export async function changePassword(server: FastifyInstance) {
    server.patch("/change-password", async (request, reply) => {
        if (typeof process.env.JWT_SECRET !== "string") {
            return reply
                .status(500)
                .send({ message: "Configuração de token não aplicada" });
        }

        const requestAuthorization = request.headers["authorization"];

        const token = requestAuthorization?.split(" ")[1];

        if (!token) {
            //TODO: Adicionar isso ao middleware de autorização
            return reply.send({ message: "Falta token na requisição" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            id: number;
        };

        let changePassword: ChangePasswordInput;

        try {
            changePassword = changePasswordSchema.parse(request.body);
        } catch (error) {
            return reply.status(400).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        const profile = await profileRepository.findById(decoded.id, true);

        if (!profile) {
            return reply
                .status(404)
                .send({ message: "Usuário não encontrado" });
        }

        const { currentPassword, newPassword, repeatPassword } = changePassword;

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            profile.password,
        );

        if (!passwordMatch) {
            return reply.status(401).send({ message: "Senha atual incorreta" });
        }

        if (currentPassword === newPassword) {
            return reply.status(400).send({
                message: "A nova senha não pode ser igual à antiga senha",
            });
        }

        if (newPassword !== repeatPassword) {
            return reply.status(400).send({
                message: "Nova senha e repetida devem ser iguais",
            });
        }

        await profileRepository.updatePassword(profile.id, newPassword);

        return reply
            .status(200)
            .send({ message: "Senha alterada com sucesso" });
    });
}
