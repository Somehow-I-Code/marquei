import { FastifyInstance } from "fastify";
import profileRepository from "../../repositories/profiles";
import { createProfileSchema } from "../../validators/profile";

export async function adminCreateProfile(server: FastifyInstance) {
    server.post("/admin/profiles", async (request, reply) => {
        const { name, occupation, email, level, companyId } =
            createProfileSchema.parse(request.body);

        const newProfile = await profileRepository.create({
            name,
            occupation,
            email,
            level,
            companyId,
        });

        return reply.status(201).send(newProfile);
    });
}
