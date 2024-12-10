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
        const parsedData = schema.parse(data);

        return parsedData;
    } catch (error) {
        throw new HttpError(BAD_REQUEST, (error as ZodError).issues[0].message);
    }
}
