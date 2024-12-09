import { Profile } from "@prisma/client";
import { compare } from "bcrypt";

import { decodeAuthToken } from "@http/utils/decode-auth-token";
import { signAuthToken } from "@http/utils/sign-auth-token";
import { validateAuthToken } from "@http/utils/validate-auth-token";
import {
    ProfileRepositoryType,
    profileRepository,
} from "@repositories/profiles";
import { UNAUTHORIZED } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";
import emailService, { EmailServiceType } from "@services/email";

class AuthService {
    constructor(
        private profileRepository: ProfileRepositoryType,
        private emailService: EmailServiceType,
    ) {}

    async login(credentials: { email: string; password: string }) {
        const profile = await this.findUserByEmail(credentials.email);

        await this.compareEncryptedPassword(
            credentials.password,
            profile.password,
        );

        const token = signAuthToken(profile);

        return token;
    }

    async sudoLogin(email: string) {
        const profile = await this.findUserByEmail(email);

        if (profile.level === "SUDO") {
            throw new HttpError(
                UNAUTHORIZED,
                "Você não pode logar como outro usuário SUDO",
            );
        }

        const token = signAuthToken(profile);

        return token;
    }

    async updatePassword(
        profile: Profile,
        data: {
            currentPassword: string;
            newPassword: string;
            repeatPassword: string;
        },
    ) {
        await this.compareEncryptedPassword(
            data.currentPassword,
            profile.password,
        );

        await this.comparePasswords(data.newPassword, data.repeatPassword);

        const updatedProfile = await this.profileRepository.updatePassword(
            profile.id,
            data.newPassword,
        );

        const token = signAuthToken(updatedProfile);

        return token;
    }

    async resetPasswordToken(email: string) {
        const _1_HOUR = 60 * 60 * 1000;

        const profile = await this.findUserByEmail(email);

        const token = signAuthToken(profile, _1_HOUR);

        await this.emailService.sendResetPasswordLink(token);

        return token;
    }

    async resetPassword(
        token: string,
        data: { newPassword: string; repeatPassword: string },
    ) {
        const decodedProfile = decodeAuthToken(token);

        validateAuthToken(token);

        await this.comparePasswords(data.newPassword, data.repeatPassword);

        const { password, ...updatedProfile } =
            await this.profileRepository.updatePassword(
                decodedProfile.id,
                data.newPassword,
            );

        return updatedProfile;
    }

    async setPassword(
        profile: Profile,
        data: { newPassword: string; repeatPassword: string },
    ) {
        if (!profile.firstLogin) {
            throw new HttpError(
                UNAUTHORIZED,
                "Você já definiu sua senha. Use a opção de atualizar a senha.",
            );
        }

        this.comparePasswords(data.newPassword, data.repeatPassword);

        const updatedProfile = await this.profileRepository.updatePassword(
            profile.id,
            data.newPassword,
        );

        const token = signAuthToken(updatedProfile);

        return token;
    }

    private async findUserByEmail(email: string) {
        const profile = await this.profileRepository.findByEmail(email);

        if (!profile) {
            throw new HttpError(UNAUTHORIZED, "Credenciais inválidas");
        }

        return profile;
    }

    private async compareEncryptedPassword(
        password: string,
        encryptedPassword: string,
    ) {
        const passwordsMatch = await compare(password, encryptedPassword);

        if (!passwordsMatch) {
            throw new HttpError(UNAUTHORIZED, "Credenciais inválidas");
        }

        return true;
    }

    private comparePasswords(password1: string, password2: string) {
        if (password1 !== password2) {
            throw new HttpError(UNAUTHORIZED, "As senhas não coincidem");
        }

        return true;
    }
}

export const authService = new AuthService(profileRepository, emailService);
export type AuthServiceType = typeof authService;
