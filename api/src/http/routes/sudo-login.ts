import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { IncomingHttpHeaders } from "http";
import { sign, verify } from "jsonwebtoken";
import { ZodError } from "zod";
import profileRepository from "../../repositories/profiles";
import {
    SudoLoginInput,
    sudoLoginSchema,
} from "./../../validators/sudo-profile";

function getToken(headers: IncomingHttpHeaders) {
    const { authorization } = headers;

    return authorization?.split(" ")[1];
}

export async function sudoLogin(server: FastifyInstance) {
    server.post("/sudo-login", async (request, reply) => {
        const sudoToken = getToken(request.headers);

        if (!sudoToken) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        if (process.env.JWT_SECRET === undefined) {
            return reply
                .status(500)
                .send({ message: "JWT secret não configurado!" });
        }

        const sudoProfile = verify(sudoToken, process.env.JWT_SECRET) as {
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

        const token = sign(
            {
                id: profile.id,
                email: profile.email,
                level: profile.level,
                companyId: profile.companyId,
            },
            process.env.JWT_SECRET,
        );

        return reply.status(200).send({ token });
    });
}
