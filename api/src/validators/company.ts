import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string({
        required_error: "Nome da empresa é obrigatório!",
        invalid_type_error: "Nome da empresa é obrigatório!",
    }),
    isActive: z.boolean(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
