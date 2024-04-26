import { CategoriesResponse } from "@/types/categories";
import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewResourceForm, {
    NewResourceFormSchema,
} from "./components/newResourceForm";

async function getCategories(): Promise<CategoriesResponse> {
    const response = await fetch("http://api:8080/categories");
    const data = await response.json();
    return data;
}

export default async function NewResource() {
    const categories = await getCategories();

    async function createResource(data: NewResourceFormSchema) {}

    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Novo recurso</FormTitle>

                <NewResourceForm
                    categories={categories}
                    createResource={createResource}
                />
            </div>
        </section>
    );
}
