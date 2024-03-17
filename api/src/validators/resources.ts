import { z } from "zod";

export const createResource = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
});

export type CreateResourceInput = z.infer<typeof createResource>;
