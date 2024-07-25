import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import { getToken } from "../routes/utils/get-token";

function removeSudoFromLevels(levels: Array<string>) {
    return levels.filter((level) => level !== Level.SUDO);
}

export async function getLevels(server: FastifyInstance) {
    server.get("/levels", async (request, reply) => {
        const levelToken = getToken(request.headers);

        if (!levelToken) {
            return reply.status(400).send({ message: "Token inválido" });
        }

        if (process.env.JWT_SECRET === undefined) {
            return reply
                .status(500)
                .send({ message: "JWT SECRET não configurado" });
        }

        const profile = verify(levelToken, process.env.JWT_SECRET) as {
            level: Level;
        };

        const levels = Object.keys(Level);
        if (profile.level === Level.SUDO) {
            return reply.send(levels);
        }

        return reply.send(removeSudoFromLevels(levels));
    });
}
