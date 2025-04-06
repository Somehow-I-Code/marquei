import { faker } from "@faker-js/faker";
import { prisma } from "../../src/lib/prisma";

const RANDOM_APPOINTMENTS_COUNT = 25;

interface Appointment {
    name: string;
    startsAt: Date;
    endsAt: Date;
    description: string;
}

function createRandomAppointments(amount: number): Appointment[] {
    return Array.from({ length: amount }, (): Appointment => {
        const startsAt = faker.date.future();
        const endsAt = new Date(startsAt.getTime() + 60 * 60000);

        return {
            name: faker.person.fullName(),
            startsAt,
            endsAt,
            description: faker.helpers.arrayElement([
                `Consulta de retorno com Dr. ${faker.person.lastName()} às ${faker.date.soon().toLocaleTimeString()}.`,
                `Primeira consulta para avaliação com Dra. ${faker.person.lastName()}.`,
                "Exame de rotina – paciente precisa estar em jejum.",
                `Sessão de fisioterapia com o Dr. ${faker.person.lastName()}.`,
                "Reunião com advogado para análise de contrato.",
                "Consulta para esclarecimento sobre processo em andamento.",
                "Assinatura de documentos no escritório.",
                `Corte e hidratação capilar com ${faker.person.firstName()}.`,
                "Sessão de depilação a laser – cliente já realizou teste.",
                "Massagem relaxante – duração de 60 minutos.",
                "Visita técnica para avaliação de obra.",
                "Consulta de nutrição – trazer exames recentes.",
                "Consulta de psicologia – trazer diário emocional.",
            ]),
        };
    });
}

async function saveRandomAppointments(
    appointments: Appointment[],
): Promise<Appointment[]> {
    return prisma.$transaction(
        appointments.map((appointment) =>
            prisma.appointment.create({ data: appointment }),
        ),
    );
}

export default async function seedAppointments() {
    faker.seed(123);

    const randomAppointments = createRandomAppointments(
        RANDOM_APPOINTMENTS_COUNT,
    );

    const appointments = await saveRandomAppointments(randomAppointments);

    return appointments;
}

