import CompanyLogo from "../components/company-logo";
import ChangePasswordForm from "./components/change-password-form";

export default async function ChangePasswordPage() {
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>

            <div className="flex flex-col p-6 gap-12">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Alterar sua senha
                </h1>

                <ChangePasswordForm />
            </div>
        </section>
    );
}
