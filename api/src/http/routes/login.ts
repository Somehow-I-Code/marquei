import { FastifyInstance } from "fastify";

export async function login(server: FastifyInstance) {
    server.post("/login", async (request, reply) => {
        const { email, password } = request.body;

        // procura no banco de dados por algum usuário com esse email
        // se não encontrou já retorna erro

        // se encontrou, encripta a senha que o usuário mandou
        // pega o usuário que veio pelo email
        // checa se as senhas encriptadas são iguais
        // se não forem retorna erro

        // se forem retorna sucesso e devolve o jwt

        reply.send({ email, password, isFromBackend: true });
    });
}
