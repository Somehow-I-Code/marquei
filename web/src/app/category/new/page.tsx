import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import CompanyLogo from "../../components/company-logo";
import NewCategoryForm, {
    NewCategoryFormSchema,
} from "./component/new-category-form";

export default async function NewCategoryPage() {
    async function createCategory(data: NewCategoryFormSchema) {
        "use server";

        const session = cookies().get("session")?.value;

        const body = {
            ...data,
        };

        const response = await fetch("http://api:8080/categories", {
            method: "POST",
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

        revalidatePath("/resource/list");
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
