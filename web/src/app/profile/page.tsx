import { Button } from "@/components/ui/button";
import { ProfilesResponse } from "@/types/profiles";
import Link from "next/link";
import UserImage from "./assets/user.svg";

async function getProfile(): Promise<ProfilesResponse> {
    //TODO: Buscar o token do cookie da sessão
    const token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYUB0ZXh0LmNvbSIsImxldmVsIjoiVVNFUiIsImlhdCI6MTcxNzAwNDA4OX0.l_HNrXszwsP_xrQNjA95RHEYMvNGAF5cfd_KEGkbcrc";

    const response = await fetch("http://api:8080/profile", {
        headers: {
            authorization: token,
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
                <Button variant="destructive" className="font-bold text-base">
                    SAIR
                </Button>
            </div>
        </section>
    );
}
