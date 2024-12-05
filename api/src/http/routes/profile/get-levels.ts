import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";

import { findLoggedUser } from "@middlewares/find-logged-user";
import { userIdentifiedRequest } from "@middlewares/validator/requests";
import { verifyToken } from "@middlewares/verify-token";

function removeSudoFromLevels(levels: Array<string>) {
    return levels.filter((level) => level !== Level.SUDO);
}

export async function getLevels(server: FastifyInstance) {
    server.get(
        "/levels",
        {
            preHandler: [verifyToken, findLoggedUser],
        },
        async (request, reply) => {
            const { profile } = userIdentifiedRequest.parse(request);

            const levels = Object.keys(Level);

            if (profile.level === Level.SUDO) {
                return reply.send(levels);
            }

            return reply.send(removeSudoFromLevels(levels));
        },
    );
}
