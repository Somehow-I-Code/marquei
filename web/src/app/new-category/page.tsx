import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import NewCategoryForm, {
    NewCategoryFormSchema,
} from "./component/new-category-form";
import getSession from "../utis/get-session";
import { redirect } from "next/navigation";

export default async function NewCategory() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    async function createCategory(data: NewCategoryFormSchema) {
        "use server";

        const body = {
            name: data.name,
        };

        const response = await fetch("http://api:8080/categories", {
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
            <div className="flex flex-col p-6 gap-12">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Nova Categoria
                </h1>

                <NewCategoryForm createCategory={createCategory} />
            </div>
        </section>
    );
}
