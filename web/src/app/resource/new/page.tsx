import { CategoriesResponse } from "@/types/categories";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CompanyLogo from "../../components/company-logo";
import FormTitle from "../../components/form-title";
import NewResourceForm, {
    NewResourceFormSchema,
} from "./components/new-resource-form";

async function getCategories(): Promise<CategoriesResponse> {
    const token = cookies().get("session")?.value;

    const response = await fetch("http://api:8080/categories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        cookies().delete("session");
        redirect("/login");
    }

    const data = await response.json();

    return data;
}

export default async function NewResourcePage() {
    const { categories } = await getCategories();

    async function createResource(data: NewResourceFormSchema) {
        "use server";

        const body = {
            ...data,
            categoryId: Number(data.category),
        };

        const session = cookies().get("session")?.value;

        const response = await fetch("http://api:8080/resources", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${session}`,
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 201) {
            if (response.status === 401) {
                cookies().delete("session");
                redirect("/login");
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        const { refreshedToken } = await response.json();
        cookies().set("session", refreshedToken);

        revalidatePath("/resource/list");
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
