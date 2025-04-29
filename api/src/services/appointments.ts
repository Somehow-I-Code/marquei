import {
    appointmentsRepository,
    AppointmentsRepositoryType,
} from "./../repositories/appointments";

class AppointmentsService {
    // Alterar o construtor nos permite injetar o repositório de agendamentos como uma
    // dependência tornando nosso código mais fácil de manter e testar.
    // Não precisa executar bind, pq suas funções não são executadas mais como callback
    constructor(private appointmentsRepository: AppointmentsRepositoryType) {}

    async find(id: number) {
        // Toda a lógica de negócio relacionada a buscar um agendamento deve ser feita nessa função
        const appointment = await this.appointmentsRepository.find(id);

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
