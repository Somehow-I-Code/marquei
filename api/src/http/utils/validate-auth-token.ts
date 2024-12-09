import { UNAUTHORIZED } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";
import { decodeAuthToken } from "./decode-auth-token";

export function validateAuthToken(
    token: string,
    decodeToken = decodeAuthToken,
) {
    const profile = decodeToken(token);

    if (profile.exp < Date.now()) {
        throw new HttpError(UNAUTHORIZED, "Token expirado");
    }

    return true;
}
