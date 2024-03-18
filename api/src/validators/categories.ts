import { z } from "zod";

export const createCategory = z.object({
  title: z.string(),
});

export type CreateCategoryInput = z.infer<typeof createCategory>;