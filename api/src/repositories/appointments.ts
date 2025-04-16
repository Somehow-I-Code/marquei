import { prisma } from "@lib/prisma";

class AppointmentsRepository {
    // Encontra um appointment através do seu id
    async find(id: number) {
        //TODO: fazer a busca em banco de dados quando houver dados
        return `From repository id: ${id}`;
    }

    // Encontra um appointment através de uma data especifica (day)
    async findByDay(startsAt: Date | string) {
        // Busca o início do dia.
        const startOfDay = new Date(startsAt);
        // Usa getDate para voltar um dia (Exemplo: 16 - 1 = 15, a data é 15)
        startOfDay.setDate(startOfDay.getDate() - 1);
        // Define o horário para o inicio do dia (Começa à meia-noite)
        startOfDay.setHours(0, 0, 0, 0);

        // Busca o início do próximo dia.
        const endOfDay = new Date(startsAt);
        // Usa o getDate para avançar um dia (Exemplo: 16 + 1 = 17, a data é 17)
        endOfDay.setDate(endOfDay.getDate() + 1);
        // Define o horário para o início do próximo do dia (Antes de meia-noite).
        endOfDay.setHours(0, 0, 0, 0);

        //Busca no banco de dados o dia desejado
        const appointments = await prisma.appointment.findMany({
            where: {
                startsAt: {
                    gte: startOfDay, // O gte(>=), pega o dia, por exemplo, >= 16/04/2025 00:00:00.
                    lt: endOfDay, // O lt(<), pega antes do próximo dia, por exemplo, < 17/04/2025 00:00:00.
                },
            },
        });

        return appointments;
    }
}

export const appointmentsRepository = new AppointmentsRepository();

export type AppointmentsRepositoryType = typeof appointmentsRepository;
