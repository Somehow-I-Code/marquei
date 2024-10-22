import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../components/company-logo";
import ProfileCard from "../components/profile-card";
import Salute from "../components/salute";

const profiles = [
    {
        id: 1,
        name: "Maria da Silva",
        email: "mariadasilva@marquei.com",
        level: "ADMIN",
        occupation: "Gerente",
    },
    {
        id: 2,
        name: "José Gomes",
        email: "josegomes@marquei.com",
        level: "USER",
        occupation: "Gerente",
    },
    {
        id: 3,
        name: "João da Silva",
        email: "joaodasilva@marcado.com",
        level: "USER",
        occupation: "Atendente",
    },
];

async function getHello() {
    const response = await fetch("http://api:8080/hello");
    const data = await response.json();
    return data;
}

type ProfileListParams = {
    searchParams: {
        q: string | undefined;
    };
};

export default async function ProfilesList({
    searchParams,
}: ProfileListParams) {
    const { q } = searchParams;
    const greeting = await getHello();
    const filteredResults = profiles.filter((profile) => {
        if (!q) {
            return true;
        }
        const formattedFilter = q.toLowerCase();
        const searchableKeys = [
            "name",
            "email",
            "level",
            "occupation",
        ] as Array<keyof typeof profile>;
        return searchableKeys.some((key) => {
            const value = profile[key];
            return (
                typeof value === "string" &&
                value.toLowerCase().includes(formattedFilter)
            );
        });
    });

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
                    <form className="flex flex-grow">
                        <Input
                            className="rounded-r-none"
                            name="q"
                            placeholder="Busque por um perfil"
                        />
                        <Button className="bg-indigo-950 rounded-sm rounded-l-none">
                            <Search />
                        </Button>
                    </form>
                </div>
            </div>

            {filteredResults.length === 0 ? (
                <p>
                    Ops! Não conseguimos encontrar nenhum perfil que corresponda
                    à sua busca.
                </p>
            ) : (
                filteredResults.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))
            )}
        </section>
    );
}
