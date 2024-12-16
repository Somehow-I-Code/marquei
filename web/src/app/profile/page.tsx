import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getProfile } from "./actions";
import UserImage from "./assets/user.svg";
import LogoutButton from "./components/logout-button";

async function doLogout() {
    "use server";
    cookies().delete("session");

    redirect("/login");
}

async function getProfile() {
    "use server";

    (await cookies()).delete("session");

    return { profile: {} };
}

export default async function ProfilePage() {
    const { profile } = await getProfile();

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

            <div className="flex flex-col p-6 gap-16">
                <div className="flex flex-col gap-4">
                    <Button asChild className="font-bold text-base">
                        <Link href="/auth/update-password">ALTERAR SENHA</Link>
                    </Button>

                    <Button asChild variant="secondary">
                        <Link href="/">VOLTAR</Link>
                    </Button>
                </div>
                <LogoutButton doLogout={doLogout} />
            </div>
        </section>
    );
}
