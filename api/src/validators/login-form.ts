import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido!"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres, incluindo letras e números."),
});

export type LoginInput = z.infer<typeof loginSchema>;

