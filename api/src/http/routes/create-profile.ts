import { FastifyInstance } from "fastify";
import profileRepository from "../../repositories/profiles";
import { createProfileSchema } from "../../validators/profile";

export async function createProfile(server: FastifyInstance) {
    server.post("/profiles", async (request, reply) => {
        const { name, occupation, email, level } = createProfileSchema.parse(
            request.body,
        );

        const profile = await profileRepository.create({
            name,
            occupation,
            email,
            level,
        });

        return reply.status(201).send(profile);
    });
}
