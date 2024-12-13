import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

        const response = await fetch("http://api:8080/companies", {
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
