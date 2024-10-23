import { z } from "zod";

export const sudoLoginSchema = z.object({
    email: z.string().email({ message: "Email inválido!" }),
});

export type SudoLoginInput = z.infer<typeof sudoLoginSchema>;
