import z from "zod";

export const changePasswordSchema = z.object({
    // Passando o campo currentPassword para opcional, pois no fluxo de alterar a senha é obrigatório o campo
    // mas no fluxo de atualizar a senha é opcional
    currentPassword: z
        .string()
        .min(8, {
            message: "A senha atual deve conter no mínimo 8 caracteres",
        })
        .optional(),
    newPassword: z
        .string()
        .min(8, { message: "A senha nova deve conter no mínimo 8 caracteres" }),
    repeatPassword: z.string().min(8, {
        message: "A senha repetida deve conter no mínimo 8 caracteres",
    }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
