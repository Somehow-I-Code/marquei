"use server";

import { ProfilesResponse } from "@/types/profiles";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getProfile(): Promise<ProfilesResponse> {
    const session = cookies().get("session")?.value;

    const response = await fetch("http://api:8080/profiles", {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${session}`,
        },
    });

    if (response.status === 401) {
        (await cookies()).delete("session");
        redirect("/login");
    }

    const data = await response.json();

    return data;
}
