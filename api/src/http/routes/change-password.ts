import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import profileRepository from "../../repositories/profiles";
import { changePasswordSchema } from "../../validators/change-password";
import { ChangePasswordInput } from "./../../validators/change-password";

// Função que pega a autorização do cabeçalho da requisição,
// separa o bearer do token e retorna somente o token
function getToken(headers: IncomingHttpHeaders) {
    const requestAuthorization = headers["authorization"];
    return requestAuthorization?.split(" ")[1];
}

export async function changePassword(server: FastifyInstance) {
    // Endpoint de mudar a senha
    server.patch("/change-password", async (request, reply) => {
        // Chamando a função que retorna o token e atribuindo esse valor à variável token
        const token = getToken(request.headers);

        // Verificando se o JWT_SECRET está configurado, se não estiver retorna erro
        if (typeof process.env.JWT_SECRET !== "string") {
            return reply
                .status(500)
                .send({ message: "Configuração de token não aplicada" });
        }

        // Verificando se existe token, se não existir retorna erro
        if (!token) {
            //TODO: Adicionar isso ao middleware de autorização
            return reply.send({ message: "Falta token na requisição" });
        }

        // Decodificando o token, pegando como keys o id e o firstLogin,
        // e atribuindo o resultado à variável decoded
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            id: number;
            firstLogin: boolean;
        };

        // Declarando a variável com validação e tipo do ChangePasswordInput
        let changePassword: ChangePasswordInput;

        try {
            // Extraindo informações do corpo da requisição
            changePassword = changePasswordSchema.parse(request.body);
        } catch (error) {
            // Caso exista algum erro de validação das informações, retorna mensagem de erro
            return reply.status(400).send({
                message: (error as ZodError).issues[0].message,
            });
        }

        // Retornando um perfil, através da busca pelo id
        const profile = await profileRepository.findById(decoded.id, true);

        // Se o perfil não existir retorna mensagem de erro
        if (!profile) {
            return reply
                .status(404)
                .send({ message: "Usuário não encontrado" });
        }

        // Extraindo as informações do changePassword
        const { currentPassword, newPassword, repeatPassword } = changePassword;

        // Se o firstLogin for falso, significa que não é o primeiro login do usuário
        if (decoded.firstLogin === false) {
            // Verifica se existe a senha atual, se não existir retorna erro
            if (!currentPassword) {
                return reply
                    .status(400)
                    .send({ message: "É obrigatório senha atual!" });
            }

            // Usa a função compare do bcrypt para verificar se a senha atual é igual à senha do perfil
            // e atribuí o resultado à variável passwordMatch
            const passwordMatch = await bcrypt.compare(
                currentPassword,
                profile.password,
            );

            // Se as senhas não baterem, retorna mensagem de erro
            if (!passwordMatch) {
                return reply
                    .status(401)
                    .send({ message: "Senha atual incorreta" });
            }

            // Verifica se a nova senha é igual à senha atual, se for retorna mensagem de erro
            if (currentPassword === newPassword) {
                return reply.status(400).send({
                    message: "A nova senha não pode ser igual à antiga senha",
                });
            }
        }

        // Verifica se a nova senha e se a senha repetida são iguais, se não for retorna mensagem de erro
        if (newPassword !== repeatPassword) {
            return reply.status(400).send({
                message: "Nova senha e repetida devem ser iguais",
            });
        }

        // Atualizando a senha e o campo firstLogin, e atribuindo os valores à variável updatedProfile
        const updatedProfile = await profileRepository.updatePassword(
            profile.id,
            newPassword,
            // Pq não preciso passar o firstLogin como parâmetro da função?
        );

        // Gerando um novo token com as informações atualizadas
        const refreshedToken = jwt.sign(
            {
                id: updatedProfile.id,
                email: updatedProfile.email,
                level: updatedProfile.level,
                companyId: updatedProfile.companyId,
                firstLogin: updatedProfile.firstLogin,
            },
            process.env.JWT_SECRET,
        );

        // Retornando o token atualizado
        return reply.status(200).send({ token: refreshedToken });
    });
}
