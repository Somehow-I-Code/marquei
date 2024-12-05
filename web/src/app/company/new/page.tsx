import { cookies } from "next/headers";
import CompanyLogo from "../../components/company-logo";
import FormTitle from "../../components/form-title";
import NewCompanyForm, {
    NewCompanyFormSchema,
} from "./components/new-company-form";

export default async function NewCompanyPage() {
    async function createCompany(data: NewCompanyFormSchema) {
        "use server";

        const body = {
            ...data,
        };

        const session = cookies().get("session")?.value;

        const response = await fetch("http://api:8080/company", {
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
