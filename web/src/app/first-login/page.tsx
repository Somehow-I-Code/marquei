import { redirect } from "next/navigation";
import CompanyLogo from "../components/company-logo";
import WelcomeImage from "./assets/welcome.svg";
import FirstLoginForm from "./components/first-login-reset-password";
import getSession from "../utis/get-session";

export default async function FirstLogin() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    //TODO: Fazer o fetch para enviar no BD(DB)

    return (
        <section className="py-12 px-6 space-y-12">
            <div className="flex flex-col items-center">
                <p className="font-semibold">Bem-vindo ao</p>
                <CompanyLogo />
            </div>

            <div className="flex justify-center items-center">
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
