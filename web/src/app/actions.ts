"use server";

import { DecodedProfile } from "@/types/profiles";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function readCookieData() {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
        return null;
    }

    return jwtDecode(token) as DecodedProfile;
}
