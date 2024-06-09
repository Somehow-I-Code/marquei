import { FastifyInstance } from "fastify"


export async function PutPassword(server: FastifyInstance){
    server.put("/change-password", (request, reply)=> {
        return "Atualizando a senha"
    })
}