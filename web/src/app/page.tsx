import { ResourceResponse, Resources } from "@/types/resources";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BottomFloatingMenu from "./components/bottom-floating-menu";
import CategoriesList from "./components/categories-list";
import CompanyLogo from "./components/company-logo";
import ResourcesList from "./components/resources-list";
import Salute from "./components/salute";

async function getHello() {
    const response = await fetch("http://api:8080/hello");
    const data = await response.json();
    return data;
}

function transformResources(resources: ResourceResponse) {
    return resources.map(({ id, name, description, category }) => ({
        id,
        name,
        description,
        category: category.title,
    }));
}

function getSession() {
    const session = cookies().get("session")?.value;

    if (!session) {
        return null;
    }

    return session;
}

async function getResources(): Promise<Resources> {
    const response = await fetch("http://api:8080/resources");
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

    const greeting = await getHello();
    const resources = await getResources();
    const resourcesByCategory = getResourcesByCategory(resources);
    const categoriesList = Object.keys(resourcesByCategory);

    return (
        <>
            <header className="flex justify-between items-end px-6 py-12">
                <CompanyLogo />
                <Salute>{greeting?.hello || "Usuário"}</Salute>
            </header>

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
