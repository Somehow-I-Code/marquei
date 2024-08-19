import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string().min(1, { message: "Nome da empresa é obrigatório!" }),
    isActive: z.boolean(),
    city: z.string(),
    nickname: z.string(),
    representativeName: z.string(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
