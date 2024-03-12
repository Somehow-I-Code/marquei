import Fastify from "fastify";

const server = Fastify();

server.get("/hello", async (request, reply) => {
    reply.send({ hello: "thiago" });
});

server.get("/resources", async (request, reply) => {
    reply.send({
        data: [
            {
                name: "Resource #1",
                description:
                    "#1 Here we have some text helping describe that resource",
                category: "Médicos",
            },

            {
                name: "Resource #2",
                description:
                    "#2 Here we have some text helping describe that resource",
                category: "Médicos",
            },

            {
                name: "Resource #3",
                description:
                    "#3 Here we have some text helping describe that resource",
                category: "Médicos",
            },

            {
                name: "Resource #4",
                description:
                    "#4 Here we have some text helping describe that resource",
                category: "Médicos",
            },

            {
                name: "Resource #5",
                description:
                    "#5 Here we have some text helping describe that resource",
                category: "Médicos",
            },

            {
                name: "Resource #6",
                description:
                    "#6 Here we have some text helping describe that resource",
                category: "Exames",
            },

            {
                name: "Resource #7",
                description:
                    "#7 Here we have some text helping describe that resource",
                category: "Exames",
            },

            {
                name: "Resource #8",
                description:
                    "#8 Here we have some text helping describe that resource",
                category: "Exames",
            },

            {
                name: "Resource #9",
                description:
                    "#9 Here we have some text helping describe that resource",
                category: "Resultados",
            },
        ],
    });
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
