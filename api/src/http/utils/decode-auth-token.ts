import { Profile } from "@prisma/client";
import { verify } from "jsonwebtoken";

import { getJwtSecret } from "@routes/utils/get-jwt-secret";
import { UNAUTHORIZED } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";

export type DecodedToken = Omit<Profile, "password"> & {
    iat: number;
    exp: number;
};

export function decodeAuthToken(token: string) {
    const secretKey = getJwtSecret();

    const profile = verify(token, secretKey) as DecodedToken;

    if (!profile) {
        throw new HttpError(UNAUTHORIZED, "Token inválido");
    }

    return profile;
}
