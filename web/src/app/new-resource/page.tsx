import { CategoriesResponse } from "@/types/categories";
import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewResourceForm, {
    NewResourceFormSchema,
} from "./components/new-resource-form";
import getSession from "../utis/get-session";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

async function getCategories(token: string): Promise<CategoriesResponse> {
    const response = await fetch("http://api:8080/categories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    return data;
}

export default async function NewResource() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    const categories = await getCategories(session);

    const decoded = jwtDecode(session) as {
        companyId: number;
    };

    const companyId = decoded.companyId;

    async function createResource(data: NewResourceFormSchema) {
        "use server";

        const body = {
            ...data,
            categoryId: Number(data.category),
            companyId,
        };

        const response = await fetch("http://api:8080/resources", {
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${session}`,
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
