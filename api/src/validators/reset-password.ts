import z from "zod";

export const resetPasswordSchema = z.object({
    email: z.string().email(),
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>
