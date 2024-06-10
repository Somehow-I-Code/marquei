import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    email: z.string(),
    level: z.union([z.literal("USER"), z.literal("ADMIN"), z.literal("SUDO")]),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
