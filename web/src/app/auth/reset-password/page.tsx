import CompanyLogo from "../../components/company-logo";
import SendEmailForm, {
    SendEmailFormSchema,
} from "./components/send-email-form";

export default function ResetPassword() {
    async function requestPasswordReset(data: SendEmailFormSchema) {
        "use server";

        const response = await fetch("http://api:8080/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 200) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    }

    return (
        <section className="px-6 py-12 flex flex-col flex-wrap gap-9">
            <div>
                <CompanyLogo />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-indigo-950">
                    Recuperar senha
                </h1>
                <h2>Esqueceu sua senha? Deixa com a gente!</h2>

                <div className="py-4">
                    <SendEmailForm
                        requestPasswordReset={requestPasswordReset}
                    />
                </div>
            </div>
        </section>
    );
}
