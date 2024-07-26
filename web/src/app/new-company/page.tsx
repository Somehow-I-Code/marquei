import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewCompanyForm from "./components/new-company-form";

export default async function NewCompany() {
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>

            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Criar uma empresa</FormTitle>

                <NewCompanyForm />
            </div>
        </section>
    );
}
