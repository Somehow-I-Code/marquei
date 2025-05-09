import { SUCCESS } from "@routes/utils/http-codes";
import {
    appointmentsService,
    AppointmentsServiceType,
} from "@services/appointments";
import {
    createAppointmentSchema,
    findAppointmentSchema,
    findByDaySchema,
} from "@validators/appointments";
import { validate } from "@validators/validate";
import { FastifyReply, FastifyRequest } from "fastify";
import { CatchErrors } from "./utils/catch-errors";

class AppointmentsController {
    constructor(private appointmentsService: AppointmentsServiceType) {
        this.find = this.find.bind(this);
        this.create = this.create.bind(this);
        this.findByDay = this.findByDay.bind(this);
    }

    @CatchErrors()
    async find(request: FastifyRequest, reply: FastifyReply) {
        const { id } = validate(request.params, findAppointmentSchema);
        const appointment = await this.appointmentsService.find(id);
        return reply.status(SUCCESS).send({ appointment });
    }

    @CatchErrors()
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = validate(request.body, createAppointmentSchema);
        const appointment = await this.appointmentsService.create(data);
        return reply.status(201).send({ appointment });
    }

    @CatchErrors()
    async findByDay(request: FastifyRequest, reply: FastifyReply) {
        const { startsAt } = validate(request.params, findByDaySchema);
        const appointment = await this.appointmentsService.findByDay(startsAt);
        return reply.status(SUCCESS).send({ appointment });
    }
}

export const appointmentsController = new AppointmentsController(
    appointmentsService,
);
