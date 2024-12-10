import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string({
        required_error: "Nome da empresa é obrigatório",
        invalid_type_error: "Nome da empresa deve ser um texto",
    }),
    isActive: z.boolean({
        required_error: "Ativo é obrigatório",
        invalid_type_error: "Ativo deve ser verdadeiro ou falso",
    }),
    city: z
        .string({
            invalid_type_error: "Cidade deve ser um texto",
        })
        .optional(),
    nickname: z
        .string({
            invalid_type_error: "Apelido deve ser um texto",
        })
        .optional(),
    representativeName: z
        .string({
            invalid_type_error: "Nome do representante deve ser um texto",
        })
        .optional(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
