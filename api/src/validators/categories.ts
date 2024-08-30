import { z } from "zod";

export const createCategory = z.object({
    name: z.string({
        required_error: "Nome da categoria é obrigatório!",
        invalid_type_error: "Nome da categoria é obrigatório!",
    }),
    companyId: z.number({
        required_error: "Empresa é obrigatório, contate o suporte!",
        invalid_type_error: "Empresa é obrigatório, contate o suporte!",
    }),
});

export type CreateCategoryInput = z.infer<typeof createCategory>;
