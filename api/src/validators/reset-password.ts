import z from "zod";

export const resetPasswordSchema = z.object({
    email: z.string().email("E-mail inválido"),
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>;

