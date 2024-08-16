import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string().min(1, { message: "Nome da empresa é obrigatório!" }),
    isActive: z.boolean(),
    city: z.string().min(1, { message: "Nome da cidade é obrigatório!" }),
    nickname: z.string().min(1, { message: "Apelido é obrigatório!" }),
    representativeName: z
        .string()
        .min(1, { message: "Nome do representante é obrigatório!" }),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
