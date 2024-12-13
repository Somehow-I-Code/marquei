import { ResourceResponse, Resources } from "@/types/resources";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BottomFloatingMenu from "../../components/bottom-floating-menu";
import CompanyLogo from "../../components/company-logo";
import Salute from "../../components/salute";
import CategoriesList from "./components/categories-list";
import EmptyResourcesList from "./components/empty-resources-list";
import ResourcesList from "./components/resources-list";

function transformResources(resources: ResourceResponse) {
    return resources.map(({ id, name, description, companyId, category }) => ({
        id,
        name,
        description,
        category: category.name,
        companyId,
    }));
}

async function getResources(): Promise<Resources> {
    const token = cookies().get("session")?.value;

    const response = await fetch("http://api:8080/resources", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        cookies().delete("session");
        redirect("/login");
    }

    const data = await response.json();

    return transformResources(data.resources);
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

export default async function ResourcesListPage() {
    const resources = await getResources();

    if (resources.length === 0) {
        return <EmptyResourcesList />;
    }

    const resourcesByCategory = getResourcesByCategory(resources);
    const categoriesList = Object.keys(resourcesByCategory);

    return (
        <>
            <header className="flex justify-between items-end px-6 py-12">
                <CompanyLogo />
                <Salute />
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
