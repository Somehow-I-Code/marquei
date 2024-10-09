import z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, {
            message: "A senha atual deve conter no mínimo 8 caracteres, incluindo letras e números.",
        })
        .optional(),
    newPassword: z
        .string()
        .min(8, { message: "A senha nova deve conter no mínimo 8 caracteres, incluindo letras e números." }),
    repeatPassword: z.string().min(8, {
        message: "A senha repetida deve conter no mínimo 8 caracteres, incluindo letras e números.",
    }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
