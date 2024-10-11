"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CompanyLogo from "../components/company-logo";
import ProfileCard from "../components/profile-card";

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

export default function ProfilesList() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function handleSearch() {
        setFilter(search);
    }

    return (
        <section className="my-12 mx-6 flex flex-col gap-12">
            <div className="flex justify-between items-end">
                <CompanyLogo />
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
                        value={search}
                        onChange={updateSearch}
                    />
                    <Button
                        onClick={handleSearch}
                        className="bg-indigo-950 rounded-sm rounded-l-none"
                    >
                        <Search />
                    </Button>
                </div>
            </div>
            {profiles
                .filter((profile) => {
                    if (!filter) {
                        return profile;
                    }
                    if (
                        profile.name
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    ) {
                        return profile;
                    }
                    if (
                        profile.email
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    ) {
                        return profile;
                    }
                    if (
                        profile.level
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    ) {
                        return profile;
                    }
                    if (
                        profile.occupation
                            .toLowerCase()
                            .includes(filter.toLowerCase())
                    ) {
                        return profile;
                    }
                })
                .map((profile) => {
                    return <ProfileCard key={profile.id} profile={profile} />;
                })}
        </section>
    );
}

