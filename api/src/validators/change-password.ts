import z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, { message: "Sua senha deve conter no mínimo 8 caracteres" }),
    newPassword: z
        .string()
        .min(8, { message: "Sua senha deve conter no mínimo 8 caracteres" }),
    repeatPassword: z
        .string()
        .min(8, { message: "Sua senha deve conter no mínimo 8 caracteres" }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
