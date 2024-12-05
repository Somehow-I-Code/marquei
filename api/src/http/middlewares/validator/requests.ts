import { z } from "zod";

export const authenticatedRequest = z.object({
    userId: z.number(),
});

export const userIdentifiedRequest = authenticatedRequest.extend({
    profile: z.object({
        id: z.number(),
        name: z.string(),
        isActive: z.boolean(),
        occupation: z.string().nullable(),
        email: z.string(),
        password: z.string(),
        level: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        companyId: z.number(),
        firstLogin: z.boolean(),
    }),
});

export const refreshedTokenRequest = userIdentifiedRequest.extend({
    refreshedToken: z.string(),
});
