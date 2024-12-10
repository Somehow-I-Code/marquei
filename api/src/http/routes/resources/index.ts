import { FastifyInstance } from "fastify";

export async function resources(
    server: FastifyInstance,
    _: any,
    done: (err?: Error) => void,
) {
    server.get("/", () => {});

    server.post("/", () => {});

    done();
}
