import { ZodError } from "zod";

import { BAD_REQUEST } from "@routes/utils/http-codes";
import HttpError from "@routes/utils/http-error";

export function validate<T>(
    data: any,
    schema: {
        parse: (data: any) => T;
    },
): T {
    try {
        schema.parse(data);

        return data;
    } catch (error) {
        throw new HttpError(BAD_REQUEST, (error as ZodError).issues[0].message);
    }
}
