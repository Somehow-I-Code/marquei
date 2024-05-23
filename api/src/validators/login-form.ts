import z from "zod";

// Criando o esquema de validação para os dados email e password, do objeto loginSchema
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;
