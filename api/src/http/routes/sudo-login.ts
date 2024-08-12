import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { sign, verify } from "jsonwebtoken";
import { ZodError } from "zod";
import profileRepository from "../../repositories/profiles";
import { SudoLoginInput, sudoLoginSchema } from "../../validators/sudo-login";
import { getToken } from "./utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";

export async function sudoLogin(server: FastifyInstance) {
    server.post("/sudo-login", async (request, reply) => {
        const sudoToken = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!sudoToken) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        const sudoProfile = verify(sudoToken, secretKey) as {
            level: Level;
        };

        if (sudoProfile.level !== Level.SUDO) {
            return reply.status(401).send({
                message: "Você não tem permissão para executar esta operação!",
            });
        }

        let userData: SudoLoginInput;

        try {
            userData = sudoLoginSchema.parse(request.body);
        } catch (e) {
            return reply.status(400).send({
                error: "ValidationError",
                message: (e as ZodError).issues[0].message,
            });
        }

        const { email } = userData;

        const profile = await profileRepository.findByEmail(email);

        if (!profile) {
            return reply
                .status(404)
                .send({ message: "Usuário não encontrado!" });
        }

        if (sudoProfile.level === profile.level) {
            return reply.status(401).send({
                message: "Você não tem permissão para executar esta operação!",
            });
        }

        const token = sign(
            {
                id: profile.id,
                email: profile.email,
                level: profile.level,
                companyId: profile.companyId,
            },
            secretKey,
        );

        return reply.status(200).send({ token });
    });
}
