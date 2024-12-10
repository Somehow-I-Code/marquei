import { SERVER_ERROR } from "./http-codes";
import HttpError from "./http-error";

export function getJwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (secret === undefined) {
        throw new HttpError(SERVER_ERROR, "Configuração de token não aplicada");
    }

    return secret;
}
