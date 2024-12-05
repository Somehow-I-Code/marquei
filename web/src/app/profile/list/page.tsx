import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { AllProfilesResponse } from "@/types/profiles";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import CompanyLogo from "../../components/company-logo";
import ProfileCard from "../../components/profile-card";
import Salute from "../../components/salute";

async function getProfiles(): Promise<AllProfilesResponse> {
    const token = cookies().get("session")?.value;

    const response = await fetch("http://api:8080/profiles", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return data;
}

type ProfileListParams = {
    searchParams: {
        q: string | undefined;
    };
};

export default async function ProfilesListPage({
    searchParams,
}: ProfileListParams) {
    const { profiles } = await getProfiles();

    async function deleteProfile(id: number) {
        "use server";

        const session = cookies().get("session")?.value;

        const response = await fetch(`http://api:8080/profiles/${id}`, {
            method: "delete",
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const { refreshedToken } = await response.json();

        cookies().set("session", refreshedToken);
        revalidatePath("/profile/list");
    }

    const { q } = searchParams;

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
                <Salute>{"Usuário"}</Salute>
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
                    <ProfileCard
                        key={profile.id}
                        profile={profile}
                        deleteProfile={deleteProfile}
                    />
                ))
            )}
        </section>
    );
}
