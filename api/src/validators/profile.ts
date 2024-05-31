import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    email: z.string(),
    level: z.union([z.literal("USER"), z.literal("ADMIN")]),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export const profileSchema = z.object({
    id: z.number(),
    name: z.string(),
    occupation: z.string(),
    email: z.string(),
    level: z.union([z.literal("USER"), z.literal("ADMIN")]),
    createdAt: z.date(),
    updateAt: z.date(),
});
