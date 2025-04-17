import { prisma } from "@lib/prisma";
import { addDays, subDays } from "date-fns";

class AppointmentsRepository {
    // Encontra um appointment através do seu id
    async find(id: number) {
        //TODO: fazer a busca em banco de dados quando houver dados
        return `From repository id: ${id}`;
    }

    // Encontra um appointment através de uma data especifica (day)
    async findByDay(startsAt: Date) {
        const startOfDay = new Date(startsAt); // Pega o início da data informada
        const endOfDay = addDays(startOfDay, 1); // Obtem o final do dia (Amanhã)

        //Busca no banco de dados o dia desejado
        const appointments = await prisma.appointment.findMany({
            where: {
                startsAt: {
                    gte: startOfDay, // O gte(>=), início do dia (>= 2025-04-16).
                    lt: endOfDay, // O lt(<), início do dia seguinte (< 2025/04/17).
                },
            },
        });

        return appointments;
    }
}

export const appointmentsRepository = new AppointmentsRepository();

export type AppointmentsRepositoryType = typeof appointmentsRepository;
