import z from "zod";

// Garante que o id quando executando um find appointment seja um número
export const findAppointmentSchema = z.object({
    id: z.coerce.number({
        required_error: "Id do agendamento é obrigatório!",
        invalid_type_error: "Id do agendamento tem que ser um número",
    }),
});

export const createAppointmentSchema = z.object({
    name: z.string({
        required_error: "O nome é obrigatório",
    }),
    description: z.string({
        required_error: "A descrição é obrigatória",
    }),
    startsAt: z.coerce.date({
        required_error: "A data de início é obrigatória",
        invalid_type_error: "A data de início deve ser válida",
    }),
    endsAt: z.coerce.date({
        required_error: "A data de término é obrigatória",
        invalid_type_error: "A data de término deve ser válida",
    }),
});

// Para validar a data usada na busca por agendamentos em um dia específico.
export const findByDaySchema = z.object({
    startsAt: z.coerce.date({
        required_error: "Data de agendamento é obrigatória!",
        invalid_type_error: "A data de agendamento precisa ser válida",
    }),
});
