import { appointmentsController } from "@controllers/appointment";
import { FastifyInstance } from "fastify";

// Função que vai armazenar todas as rotas relacionadas a appointments
export function appointments(
    server: FastifyInstance,
    _: any,
    done: (err?: Error) => void,
) {
    // Essa rota responde a /appointments/1, por exemplo.
    // Por enquanto não usa middlewares e executa a função find no appointments controller
    server.get("/:id", { preHandler: [] }, appointmentsController.find);
    server.post("/", { preHandler: [] }, appointmentsController.create);
    // Essa rota responde a /appointments/by-day/2025-04-16, por exemplo.
    server.get(
        "/by-day/:startsAt",
        { preHandler: [] },
        appointmentsController.findByDay,
    );

    done();
}

