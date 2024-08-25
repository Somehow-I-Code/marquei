import { Button } from "@/components/ui/button";
import { ProfilesResponse } from "@/types/profiles";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserImage from "./assets/user.svg";

function getSession() {
    const session = cookies().get("session")?.value;

    if (!session) {
        return null;
    }

    return session;
}

async function doLogout() {
    const logoutSession = cookies().delete("session");

    return logoutSession;
}

async function getProfile(): Promise<ProfilesResponse> {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    const response = await fetch("http://api:8080/profile", {
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${session}`,
        },
    });

    const data = await response.json();

    return data;
}

export default async function ProfilePage() {
    const profile = await getProfile();

    return (
        <section>
            <div className="flex justify-center items-center relative">
                <div className=" bg-indigo-950 absolute z-[-1] top-0 left-0 w-full h-3/6"></div>
                <div className="h-52 w-52 rounded-full flex justify-center items-center">
                    <UserImage />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center">
                <span className="p-2 rounded text-indigo-950 text-2xl font-bold">
                    {profile.name}
                </span>

                <span className="text-amber-600 font-semibold">
                    {profile.occupation}
                </span>
            </div>

            <div className="flex flex-col p-6 gap-2">
                <div className="flex justify-between items-center top-0">
                    <span className="text-gray-400 text-sm">E-mail</span>
                    <span className="text-base">{profile.email}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                        Nível de perfil
                    </span>
                    <span className="text-base">{profile.level}</span>
                </div>
            </div>

            <div className="flex flex-col p-6 gap-2">
                <Button asChild className="font-bold text-base">
                    <Link href="/change-password">ALTERAR SENHA</Link>
                </Button>
                <Button
                    asChild
                    className="font-bold text-base bg-white text-indigo-950 border border-indigo-950"
                >
                    <Link href="/">VOLTAR</Link>
                </Button>
                <Button
                    onClick={doLogout}
                    variant="destructive"
                    className="font-bold text-base"
                >
                    <Link href="/login">SAIR</Link>
                </Button>
            </div>
        </section>
    );
}
