import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string({
        required_error: "Nome é obrigatório!",
        invalid_type_error: "Nome é obrigatório!",
    }),
    occupation: z.string(),
    email: z.string().email({ message: "Email inválido!" }),
    level: z.union([z.literal("USER"), z.literal("ADMIN"), z.literal("SUDO")]),
    companyId: z.number({
        required_error: "Empresa é obrigatório, contate o suporte!",
        invalid_type_error: "Empresa é obrigatório, contate o suporte!",
    }),
});

export const toggleProfileSchema = z.object({
    profileId: z.string().pipe(z.coerce.number()),
});

export const deleteProfileSchema = z.object({
    id: z.coerce.number({
        required_error: "Id do perfil é obrigatório!",
        invalid_type_error: "Id tem que ser um número, contate o suporte!",
    }),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type ToggleProfileInput = z.infer<typeof toggleProfileSchema>;
export type DeleteProfileInput = z.infer<typeof deleteProfileSchema>;
