import CompanyLogo from "../components/company-logo";
import WelcomeImage from "./assets/welcome.svg";
import FirstLoginForm from "./components/first-login-reset-password";

export default async function FirstLogin() {
    return (
        <section className="py-12 px-6 space-y-12">
            <div className="flex flex-col items-center">
                <p className="font-semibold">Bem-vindo ao</p>
                <CompanyLogo />
            </div>

            <div className="items-center">
                <WelcomeImage />
            </div>

            <div className="space-y-8">
                <h1 className="font-bold">
                    Antes de continuar, precisamos que você atualize sua senha.
                </h1>
                <FirstLoginForm />
            </div>
        </section>
    );
}

