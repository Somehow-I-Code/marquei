import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewAccountForm from "./components/newAccountForm";

export default function newAccount() {
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Novo perfil</FormTitle>

                <NewAccountForm />
            </div>
        </section>
    );
}
