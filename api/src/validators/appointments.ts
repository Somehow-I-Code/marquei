import z from "zod";

// Garante que o id quando executando um find appointment sejam número
export const findAppointmentSchema = z.object({
    id: z.coerce.number({
        required_error: "Id do agendamento é obrigatório!",
        invalid_type_error: "Id do agendamento tem que ser um número",
    }),
});
