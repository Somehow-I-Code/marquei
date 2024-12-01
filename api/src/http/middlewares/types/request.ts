import { Level } from "@prisma/client";
import { FastifyRequest } from "fastify";

export type LoggedRequest = FastifyRequest & {
    userId?: number;
    profile?: {
        id: number;
        name: string;
        isActive: boolean;
        occupation: string | null;
        email: string;
        password: string;
        level: Level;
        createdAt: Date;
        updatedAt: Date;
        companyId: number;
        firstLogin: boolean;
    };
    refreshedToken?: string;
};
