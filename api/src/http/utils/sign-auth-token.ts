import { Profile } from "@prisma/client";
import { getJwtSecret } from "@routes/utils/get-jwt-secret";
import { sign } from "jsonwebtoken";

const _24_HOURS = 60 * 60 * 24 * 1000;

export function signAuthToken(profile: Profile, expiresIn = _24_HOURS) {
    const secretKey = getJwtSecret();

    const { password, ...profileWithoutPassword } = profile;

    const token = sign(
        {
            ...profileWithoutPassword,
            iat: Date.now(),
            exp: Date.now() + expiresIn,
        },
        secretKey,
    );

    return token;
}
