import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "Nome tem que ser um texto",
    }),
    occupation: z
        .string({
            invalid_type_error: "Cargo tem que ser um texto",
        })
        .optional(),
    email: z
        .string({
            required_error: "Email é obrigatório",
            invalid_type_error: "Email deve ser um texto",
        })
        .email({ message: "Email inválido!" }),
    level: z.union([z.literal("USER"), z.literal("ADMIN"), z.literal("SUDO")]),
    companyId: z.number({
        required_error: "Empresa é obrigatório, contate o suporte!",
        invalid_type_error: "Empresa é obrigatório, contate o suporte!",
    }),
});
export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export const toggleProfileSchema = z.object({
    profileId: z
        .string({
            required_error: "Id do perfil é obrigatório",
            invalid_type_error: "Id do perfil tem que ser um número",
        })
        .transform((value) => parseInt(value)),
});
export type ToggleProfileInput = z.infer<typeof toggleProfileSchema>;

export const deleteProfileSchema = z.object({
    profileId: z
        .string({
            required_error: "Id do perfil é obrigatório",
            invalid_type_error: "Id do perfil tem que ser um número",
        })
        .transform((value) => parseInt(value)),
});
export type DeleteProfileInput = z.infer<typeof deleteProfileSchema>;
