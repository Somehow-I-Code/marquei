import z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, {
            message: "A senha atual deve conter no mínimo 8 caracteres.",
        })
        .optional(),
    newPassword: z
        .string()
        .min(8, { message: "A senha nova deve conter no mínimo 8 caracteres." }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
