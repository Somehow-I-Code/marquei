import { prisma } from "@lib/prisma";
import { addDays, parseISO } from "date-fns";

class AppointmentsRepository {
    // Encontra um appointment através do seu id
    async find(id: number) {
        //TODO: fazer a busca em banco de dados quando houver dados
        return `From repository id: ${id}`;
    }

    // Encontra um appointment através de uma data especifica
    async findByDay(startsAt: Date) {
        const startOfDay = new Date(startsAt); // Recebe o início do dia da data informada

        //Busca no banco de dados o dia desejado
        const appointments = await prisma.appointment.findMany({
            where: {
                startsAt: {
                    equals: startOfDay,
                },
            },
        });

        return appointments;
    }
}

export const appointmentsRepository = new AppointmentsRepository();

export type AppointmentsRepositoryType = typeof appointmentsRepository;
