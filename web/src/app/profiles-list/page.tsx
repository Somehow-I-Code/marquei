import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../components/company-logo";
import ProfileCard from "../components/profile-card";
import Salute from "../components/salute";
import getSession from "../utis/get-session";
import { redirect } from "next/navigation";

async function getHello() {
    const response = await fetch("http://api:8080/hello");
    const data = await response.json();
    return data;
}

export default async function ProfilesList() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    //TODO: Quando fazer a busca DB colocar no headers o authorization

    const greeting = await getHello();
    return (
        <section className="my-12 mx-6 flex flex-col gap-12">
            <div className="flex justify-between items-end">
                <CompanyLogo />
                <Salute>{greeting?.hello || "Usuário"}</Salute>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Lista de Perfis</h1>
                <Button className="bg-indigo-950 font-bold gap-2">
                    <Plus />

                    <Link className="text-xs" href="/new-profile">
                        NOVO PERFIL
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                <Label
                    className="text-sm font-semibold"
                    htmlFor="procurar e-mail"
                >
                    Procurar perfil
                </Label>
                <div className="flex">
                    <Input
                        className="rounded-r-none"
                        placeholder="Busque por um perfil"
                    />
                    <Button className="bg-indigo-950 rounded-sm rounded-l-none">
                        <Search />
                    </Button>
                </div>
            </div>
            <ProfileCard />
        </section>
    );
}
