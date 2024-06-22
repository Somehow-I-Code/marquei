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

// Logar como SUDO, atarvés do endpoint "/login"

// Função que pega a authorization do header da requisição, separa o bearer do token e retorna apenas o token
function getToken(headers: IncomingHttpHeaders) {
    const { authorization } = headers;

    return authorization?.split(" ")[1];
}

export async function sudoLogin(server: FastifyInstance) {
    // Novo endpoint para logar com outros usuário usando SUDO
    server.post("/sudo-login", async (request, reply) => {
        // Chamando a função getToken e atribuindo seu valor à variável token
        const sudoToken = getToken(request.headers);

        // Verificando se tem token, se não tiver retorna erro
        if (!sudoToken) {
            return reply.status(400).send({ message: "Token inválido!" });
        }

        // Verificando se o JWT SECRET está configurado, se não retorna erro
        if (process.env.JWT_SECRET === undefined) {
            return reply
                .status(500)
                .send({ message: "JWT secret não configurado!" });
        }

        // Decodificnado o token, pegando o level como informação
        const sudoProfile = verify(sudoToken, process.env.JWT_SECRET) as {
            level: Level;
        };

        // Verificando se o usuário logado é do tipo SUDO, se não for retorna erro
        if (sudoProfile.level !== Level.SUDO) {
            return reply.status(401).send({
                message: "Você não tem permissão para executar esta operação!",
            });
        }

        // Cria a variável que representa o corpo da requisição do SUDO login
        let userData: SudoLoginInput;

        try {
            // Pegando o email do corpo da requisição
            userData = sudoLoginSchema.parse(request.body);
        } catch (e) {
            // Devolve mensagem de erro quando a validação está errada
            return reply.status(400).send({
                error: "ValidationError",
                message: (e as ZodError).issues[0].message,
            });
        }

        // Desconrtuindo o email do corpo da requisição
        const { email } = userData;

        // Procurando o email que quero logar como SUDO
        const profile = await profileRepository.findByEmail(email);

        // Se não existir o perfil, retornar mensagem de erro
        if (!profile) {
            return reply
                .status(404)
                .send({ message: "Usuário não encontrado!" });
        }

        // Gerando o token com os dados do perfil que logarei atarvés do SUDO
        const token = sign(
            {
                id: profile.id,
                email: profile.email,
                level: profile.level,
                companyId: profile.companyId,
            },
            process.env.JWT_SECRET,
        );

        // Retornando o token na resposta da requisição
        return reply.status(200).send({ token });
    });
}
