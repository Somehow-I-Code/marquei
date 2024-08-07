import CompanyLogo from "../components/company-logo";
import SendEmailForm from "./components/send-email-form";

export default function ResetPassword() {
    return (
        <section className="px-6 py-12 flex flex-col flex-wrap gap-9">
            <div>
                <CompanyLogo />
            </div>

            <div className="">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Recuperar senha
                </h1>
                <h2>Esqueceu sua senha? Deixa com a gente!</h2>

                <div className="py-4">
                    <SendEmailForm />
                </div>
            </div>
        </section>
    );
}

