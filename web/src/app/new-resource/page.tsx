import { CategoriesResponse } from "@/types/categories";
import { revalidatePath } from "next/cache";
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

    async function createResource(data: NewResourceFormSchema) {
        "use server";

        const body = {
            ...data,
            categoryId: Number(data.category),
        };

        const response = await fetch("http://api:8080/resources", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 201) {
            const error = await response.json();
            throw new Error(error.message);
        }

        revalidatePath("/");
    }

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
