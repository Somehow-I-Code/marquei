import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string({
        required_error: "Nome é obrigatório!",
        invalid_type_error: "Nome é obrigatório!",
    }),
    occupation: z.string(),
    email: z.string().email({ message: "E-mail inválido!" }),
    level: z.union([z.literal("USER"), z.literal("ADMIN"), z.literal("SUDO")]),
    companyId: z.number({
        required_error: "Empresa é obrigatório, contate o suporte!",
        invalid_type_error: "Empresa é obrigatório, contate o suporte!",
    }),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
