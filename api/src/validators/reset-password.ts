import z from "zod";

export const resetPasswordSchema = z.object({
    email: z.string().email("Email inválido."),
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>;

