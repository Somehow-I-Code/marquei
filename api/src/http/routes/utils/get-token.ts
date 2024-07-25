import { IncomingHttpHeaders } from "http";

export function getToken(headers: IncomingHttpHeaders) {
    const requestAuthorization = headers["authorization"];
    return requestAuthorization?.split(" ")[1];
}
