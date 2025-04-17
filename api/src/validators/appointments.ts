import z from "zod";

// Garante que o id quando executando um find appointment sejam número
export const findAppointmentSchema = z.object({
    id: z.coerce.number({
        required_error: "Id do agendamento é obrigatório!",
        invalid_type_error: "Id do agendamento tem que ser um número",
    }),
});

// Para validar a data (startsAt) usada na busca por agendamentos em um dia específico.
export const findByDaySchema = z.object({
    startsAt: z.coerce.date({
        required_error: "Data de agendamento é obrigatória!",
        invalid_type_error: "A data de agendamento precisa ser válida",
    }),
});
