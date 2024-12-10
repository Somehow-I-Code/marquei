import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string().min(1, { message: "Nome da empresa é obrigatório!" }),
    isActive: z.boolean(),
    city: z.string().optional(),
    nickname: z.string().optional(),
    representativeName: z.string().optional(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
