import { Button } from "@/components/ui/button";
import { ResourceResponse, Resources } from "@/types/resources";
import Link from "next/link";
import { redirect } from "next/navigation";
import BottomFloatingMenu from "./components/bottom-floating-menu";
import CategoriesList from "./components/categories-list";
import CompanyLogo from "./components/company-logo";
import ResourcesList from "./components/resources-list";
import Salute from "./components/salute";
import Scheduling from "./home/assets/scheduling.svg";
import getSession from "./utis/get-session";

function transformResources(resources: ResourceResponse) {
    return resources.map(({ id, name, description, category }) => ({
        id,
        name,
        description,
        category: category.name,
    }));
}

async function getResources(token: string): Promise<Resources> {
    const response = await fetch("http://api:8080/resources", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return transformResources(data);
}

function getResourcesByCategory(resources: Resources) {
    return resources.reduce(
        (acc, resource) => {
            if (!acc[resource.category]) {
                acc[resource.category] = [];
            }

            acc[resource.category].push(resource);

            return acc;
        },
        {} as Record<string, Resources>,
    );
}

export default async function Home() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    const resources = await getResources(session);
    const resourcesByCategory = getResourcesByCategory(resources);
    const categoriesList = Object.keys(resourcesByCategory);

    return (
        <>
            <header className="flex justify-between items-end px-6 py-12">
                <CompanyLogo />
                <Salute>{"Usuário"}</Salute>
            </header>

            <section>
                <div className="w-full max-w-sm mx-auto text-wrap bg-slate-100 p-4 rounded-lg">
                    <p className="text-gray-950 text-base font-semibold p-2">
                        Ahh não! Você ainda não tem nenhum recurso para agendar.
                    </p>
                </div>

                <div className="flex justify-center items-center p-6">
                    <Scheduling />
                </div>

                <div className="flex justify-center items-center p-2">
                    <Button className="px-8 py-6 text-sm font-bold">
                        {/* TODO: Vai para tela de agendamento */}
                        <Link href="">CRIAR PRIMEIRO AGENDAMENTO</Link>
                    </Button>
                </div>
            </section>

            <section className="flex flex-col gap-6 pb-28">
                <CategoriesList list={categoriesList} />

                <div className="flex flex-col gap-6">
                    {categoriesList.map((category) => (
                        <ResourcesList
                            key={category}
                            title={category}
                            list={resourcesByCategory[category]}
                        />
                    ))}
                </div>
            </section>

            <BottomFloatingMenu resources={resourcesByCategory} />
        </>
    );
}
