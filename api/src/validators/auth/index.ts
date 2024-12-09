import z from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido",
    }),
    password: z.string().min(8, {
        message: "A senha deve conter no mínimo 8 caracteres.",
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const sudoLoginSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido",
    }),
});

export type SudoLoginInput = z.infer<typeof sudoLoginSchema>;

export const updatePasswordSchema = z.object({
    currentPassword: z.string().min(8, {
        message: "A senha atual deve conter no mínimo 8 caracteres.",
    }),
    newPassword: z.string().min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const resetPasswordTokenSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido",
    }),
});

export type ResetPasswordTokenInput = z.infer<typeof resetPasswordTokenSchema>;

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
    token: z.string(),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const setPasswordSchema = z.object({
    newPassword: z.string().min(8, {
        message: "A senha deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;
