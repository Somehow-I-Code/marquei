import { z } from "zod";

export const createCategory = z.object({
    name: z.string({
        required_error: "Nome da categoria é obrigatório!",
        invalid_type_error: "Nome da categoria é obrigatório!",
    }),
});

export type CreateCategoryInput = z.infer<typeof createCategory> & {
    companyId: number;
};
