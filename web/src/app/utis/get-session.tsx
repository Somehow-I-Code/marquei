import { cookies } from "next/headers";

export default function getSession() {
    const session = cookies().get("session")?.value;

    if (!session) {
        return null;
    }

    return session;
}
