import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { LoginInput, loginSchema } from "./../../validators/login-form";

// 1 - Criar o endpoint (/login)
export async function login(server: FastifyInstance) {
    // 2 - POST
    server.post("/login", async (request, reply) => {
        // Endpoit login, que espera uma requisição para dar uma resposta
        if (typeof process.env.JWT_SECRET !== "string") {
            // Não tenho muita ideia do que faz, mas acho que é uma comparação de token, verificando se é uma string, se não for retorna erro
            return reply
                .code(500)
                .send({ message: "Configuração de token não aplicada!" });
        }

        // Variável credentials declarada, com a validação e tipo do LoginInput, isso significa que credentials tem email e password
        let credentials: LoginInput;

        try {
            // 4 - Valiar os dados
            // A variável credentials está recebendo os dados do body, já validado pelo loginSchema, ou seja, tanto o email e a senha contém os requesitos aplicados pelo loginSchema
            credentials = await loginSchema.parse(request.body);

            // 4.1 - Responder o erro (400)
            // Se credentials (email e senha) não cumprir os requesitos de loginSchema retorna erro de validação
        } catch (error) {
            return reply.code(400).send({
                error: "ValidationError",
                message: (error as Error).message,
            });
        }

        // Desconstrindo credentials. Separando cada dado do objeto que foi repassado para credentials para usá-los separadamente
        const { email, password } = credentials;

        // 5 - Checar se e-mail existe no BD
        // Usando a função findByEmail para verificar se o email existe no DB, e atribuindo o resultado da função pra variável profile
        const profile = await profileRepository.findByEmail(email);

        // 5.1 - Erro (401) find unique email retorna profile
        // Se o e-mail não existir retorna mensagem de erro
        if (!profile) {
            return reply.code(401).send({ message: "Credenciais inválidas!" });
        }

        // 6 - Checar senha correta
        // Usando a função compare do bcrypt para comparar a senha digitada pelo usuário com a senha existente no DB, e atribuindo o resultado à variável passwordMatch
        const passwordMatch = await bcrypt.compare(password, profile.password);

        // 6.1 - Erro (401)
        // Se as senha não forem iguais, retorna mensagem de erro
        if (!passwordMatch) {
            return reply.code(401).send({ message: "Credenciais inválidas!" });
        }

        // 7 - Gerar token da sessão
        // Não sei muito bem, mas pelo que eu entendi a função sign do jwt está usando o objeto com email e level, e gerando o token (acredito que isso está ocorrendo no segundo parâmetro da função), mas não entendi pq tá usando o level!?
        const token = jwt.sign(
            {
                email: profile.email,
                level: profile.level,
            },
            process.env.JWT_SECRET,
        );

        // 8 - Enviar token e resposta de seucesso (200)
        // Enviando o token gerado, se a reposta for sucesso
        return reply.status(200).send(token);
    });
}
