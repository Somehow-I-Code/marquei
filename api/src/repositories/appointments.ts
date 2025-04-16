import { prisma } from "@lib/prisma";

class AppointmentsRepository {
    // Encontra um appointment através do seu id
    async find(id: number) {
        //TODO: fazer a busca em banco de dados quando houver dados
        return `From repository id: ${id}`;
    }

    // Encontra um appointment através de uma data especifica (day)
    async findByDay(startsAt: Date | string) {
        const startOfDay = new Date(startsAt); // Busca o início do dia.
        startOfDay.setDate(startOfDay.getDate() - 1); // Volta um dia (Exemplo: 16 - 1 = 15, a data é 15)
        startOfDay.setHours(0, 0, 0, 0); // Define o inicio do dia (Meia-noite)

        const endOfDay = new Date(startsAt); // Busca o início do próximo dia.
        endOfDay.setDate(endOfDay.getDate() + 1); //Avançar um dia (Exemplo: 16 + 1 = 17, a data é 17).
        endOfDay.setHours(0, 0, 0, 0); // Define o início do próximo o dia (Antes de meia-noite).

        //Busca no banco de dados o dia desejado
        const appointments = await prisma.appointment.findMany({
            where: {
                startsAt: {
                    gte: startOfDay, // O gte(>=), pega o dia (>= 16/04/2025 00:00:00).
                    lt: endOfDay, // O lt(<), pega antes do próximo dia (< 17/04/2025 00:00:00).
                },
            },
        });

        return appointments;
    }
}

export const appointmentsRepository = new AppointmentsRepository();

export type AppointmentsRepositoryType = typeof appointmentsRepository;
