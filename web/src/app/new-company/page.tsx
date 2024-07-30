import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewCompanyForm, {
    NewCompanyFormSchema,
} from "./components/new-company-form";

export default async function NewCompany() {
    async function createCompany(data: NewCompanyFormSchema) {
        "use server";

        const body = {
            ...data,
        };

        const response = await fetch("http://api:8080/company", {
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
                <FormTitle>Criar uma empresa</FormTitle>

                <NewCompanyForm createCompany={createCompany} />
            </div>
        </section>
    );
}
