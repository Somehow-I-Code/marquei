import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import { getToken } from "../routes/utils/get-token";
import { getJwtSecret } from "./utils/get-jwt-secret";

function removeSudoFromLevels(levels: Array<string>) {
    return levels.filter((level) => level !== Level.SUDO);
}

export async function getLevels(server: FastifyInstance) {
    server.get("/levels", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.status(400).send({ message: "Token inválido" });
        }

        const profile = verify(token, secretKey) as {
            level: Level;
        };

        const levels = Object.keys(Level);
        if (profile.level === Level.SUDO) {
            return reply.send(levels);
        }

        return reply.send(removeSudoFromLevels(levels));
    });
}
