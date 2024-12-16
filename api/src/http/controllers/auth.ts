import { userIdentifiedRequest } from "@middlewares/validator/requests";
import { SUCCESS } from "@routes/utils/http-codes";
import { authService, AuthServiceType } from "@services/auth";
import {
    loginSchema,
    resetPasswordSchema,
    resetPasswordTokenSchema,
    setPasswordSchema,
    sudoLoginSchema,
    updatePasswordSchema,
} from "@validators/auth";
import { validate } from "@validators/validate";
import { FastifyReply, FastifyRequest } from "fastify";
import { CatchErrors } from "./utils/catch-errors";

class AuthController {
    constructor(private authService: AuthServiceType) {
        this.login = this.login.bind(this);
        this.sudoLogin = this.sudoLogin.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.resetPasswordToken = this.resetPasswordToken.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    @CatchErrors()
    async login(request: FastifyRequest, reply: FastifyReply) {
        const credentials = validate(request.body, loginSchema);

        const { token, profile } = await this.authService.login(credentials);

        return reply.status(SUCCESS).send({ token, profile });
    }

    @CatchErrors()
    async sudoLogin(request: FastifyRequest, reply: FastifyReply) {
        const { email } = validate(request.body, sudoLoginSchema);

        const token = await this.authService.sudoLogin(email);

        return reply.status(SUCCESS).send({ token });
    }

    @CatchErrors()
    async updatePassword(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);
        const data = validate(request.body, updatePasswordSchema);

        const updatedProfile = await this.authService.updatePassword(
            profile,
            data,
        );

        return reply.status(SUCCESS).send({ profile: updatedProfile });
    }

    @CatchErrors()
    async resetPasswordToken(request: FastifyRequest, reply: FastifyReply) {
        const { email } = validate(request.body, resetPasswordTokenSchema);

        const token = await this.authService.resetPasswordToken(email);

        return reply.status(SUCCESS).send({ token });
    }

    @CatchErrors()
    async resetPassword(request: FastifyRequest, reply: FastifyReply) {
        const { token, ...data } = validate(request.body, resetPasswordSchema);

        const updatedProfile = await this.authService.resetPassword(
            token,
            data,
        );

        return reply.status(SUCCESS).send({ profile: updatedProfile });
    }

    @CatchErrors()
    async setPassword(request: FastifyRequest, reply: FastifyReply) {
        const { profile } = validate(request, userIdentifiedRequest);
        const data = validate(request.body, setPasswordSchema);

        const token = await this.authService.setPassword(profile, data);

        return reply.status(SUCCESS).send({ token });
    }
}

export const authController = new AuthController(authService);
