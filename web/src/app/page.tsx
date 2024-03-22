import { Resources } from "@/types/resources";
import BottomFloatingMenu from "./components/bottom-floating-menu";
import CategoriesList from "./components/categories-list";
import CompanyLogo from "./components/company-logo";
import ResourcesList from "./components/resources-list";
import Salute from "./components/salute";

async function getHello() {
    const response = await fetch("http://localhost:8080/hello");
    const data = await response.json();
    return data;
}

async function getResources(): Promise<{ data: Resources }> {
    const response = await fetch("http://localhost:8080/resources");
    const data = await response.json();
    return data;
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
    const greeting = await getHello();
    const resources = await getResources();

    const resourcesByCategory = getResourcesByCategory(resources.data);
    // { 'Categoria 1': [...], 'Categoria 2': [...], 'Categoria 3': [...]}
    const categoriesList = Object.keys(resourcesByCategory);
    // ['Categoria 1', 'Categoria 2', 'Categoria 3']

    return (
        <main>
            <header className="flex justify-between items-end px-6 py-12">
                <CompanyLogo />
                <Salute>{greeting?.hello || "Francisco"}</Salute>
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
        </main>
    );
}
