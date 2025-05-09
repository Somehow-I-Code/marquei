import {
    appointmentsRepository,
    AppointmentsRepositoryType,
} from "./../repositories/appointments";

class AppointmentsService {
    constructor(private appointmentsRepository: AppointmentsRepositoryType) {}

    async find(id: number) {
        const appointment = await this.appointmentsRepository.find(id);
        return appointment;
    }

    async create(data: {
        name: string;
        description: string;
        startsAt: Date;
        endsAt: Date;
    }) {
        const appointment = await this.appointmentsRepository.create(data);
        return appointment;
    }

    async findByDay(startsAt: Date) {
        const appointment =
            await this.appointmentsRepository.findByDay(startsAt);
        return appointment;
    }
}

export const appointmentsService = new AppointmentsService(
    appointmentsRepository,
);

export type AppointmentsServiceType = typeof appointmentsService;
