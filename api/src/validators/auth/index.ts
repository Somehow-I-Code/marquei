import z from "zod";

const emailTypeErrors = {
    required_error: "Email é obrigatório",
    invalid_type_error: "Email tem que ser um texto",
};

const passwordTypeErrors = {
    required_error: "Senha é obrigatória",
    invalid_type_error: "Senha tem que ser um texto",
};

const newPasswordTypeErrors = {
    required_error: "Nova senha é obrigatória",
    invalid_type_error: "Nova senha tem que ser um texto",
};

const repeatPasswordTypeErrors = {
    required_error: "Confirmação de senha é obrigatória",
    invalid_type_error: "Confirmação de senha tem que ser um texto",
};

export const loginSchema = z.object({
    email: z.string(emailTypeErrors).email({
        message: "E-mail inválido",
    }),
    password: z.string(passwordTypeErrors).min(8, {
        message: "A senha deve conter no mínimo 8 caracteres.",
    }),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const sudoLoginSchema = z.object({
    email: z.string(emailTypeErrors).email({
        message: "E-mail inválido",
    }),
});
export type SudoLoginInput = z.infer<typeof sudoLoginSchema>;

export const updatePasswordSchema = z.object({
    currentPassword: z.string(passwordTypeErrors).min(8, {
        message: "A senha atual deve conter no mínimo 8 caracteres.",
    }),
    newPassword: z.string(newPasswordTypeErrors).min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string(repeatPasswordTypeErrors).min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const resetPasswordTokenSchema = z.object({
    email: z.string(emailTypeErrors).email({
        message: "E-mail inválido",
    }),
});
export type ResetPasswordTokenInput = z.infer<typeof resetPasswordTokenSchema>;

export const resetPasswordSchema = z.object({
    newPassword: z.string(newPasswordTypeErrors).min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string(repeatPasswordTypeErrors).min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
    token: z.string({
        required_error: "Token é obrigatório",
        invalid_type_error: "Token tem que ser um texto",
    }),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const setPasswordSchema = z.object({
    newPassword: z.string(newPasswordTypeErrors).min(8, {
        message: "A senha deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string(repeatPasswordTypeErrors).min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});
export type SetPasswordInput = z.infer<typeof setPasswordSchema>;
