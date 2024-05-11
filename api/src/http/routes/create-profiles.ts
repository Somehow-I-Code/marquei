import { FastifyInstance } from "fastify";
import profileRepository from "../../repositories/profiles";
import { createProfile } from "../../validators/profile";

export async function createProfiles(server: FastifyInstance) {
    server.post("/profiles", async (request, reply) => {
        const { name, occupation, email, level } = createProfile.parse(
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
