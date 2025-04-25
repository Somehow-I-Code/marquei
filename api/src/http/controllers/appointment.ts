import { SUCCESS } from "@routes/utils/http-codes";
import {
    appointmentsService,
    AppointmentsServiceType,
} from "@services/appointments";
import {
    createAppointmentSchema,
    findAppointmentSchema,
} from "@validators/appointments";
import { validate } from "@validators/validate";
import { FastifyReply, FastifyRequest } from "fastify";
import { CatchErrors } from "./utils/catch-errors";

class AppointmentsController {
    // Alterar o construtor nos permite injetar o serviço de agendamentos como uma
    // dependência tornando nosso código mais fácil de manter e testar
    constructor(private appointmentsService: AppointmentsServiceType) {
        // Precisamos vincular o objeto "this" da função, pois a função "find"
        // é usada como callback no arquivo de rotas
        this.find = this.find.bind(this);
        this.create = this.create.bind(this);
    }

    // Automaticamente captura e trata erros que podem acontecer a partir
    // do momento em que "find" começa a executar
    @CatchErrors()
    async find(request: FastifyRequest, reply: FastifyReply) {
        // Usa a função "validate" para tratar e tipar valores dentro do objeto "request"
        // que nos são interessantes. Neste caso os dados que nos importam estão dentro de
        // "request.params", e a estrutura de validação está definida em "findAppointmentSchema".
        // Logo, a primeira coisa a ser feita no controller é extrair os dados da requisição que
        // nos são úteis
        const { id } = validate(request.params, findAppointmentSchema);

        // Com posse dos dados pedimos ao serviço que nos encontre o agendamento.
        // O resultado desse agendamento deve ser retornado do serviço
        const appointment = await this.appointmentsService.find(id);

        // Devolvemos uma resposta http com resultado encontrado
        return reply.status(SUCCESS).send({ appointment });
    }

    @CatchErrors()
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = validate(request.body, createAppointmentSchema);

        const appointment = await this.appointmentsService.create(data);

        return reply.status(201).send({ appointment });
    }
}

export const appointmentsController = new AppointmentsController(
    appointmentsService,
);

