import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CompanyLogo from "../components/company-logo";
import WelcomeImage from "./assets/welcome.svg";
import FirstLoginForm, {
    FirstLoginFormSchema,
} from "./components/first-login-reset-password";

export default async function WelcomePage() {
    async function firstLoginResetPassword(data: FirstLoginFormSchema) {
        "use server";

        const body = {
            ...data,
        };

        const session = cookies().get("session")?.value;

        const response = await fetch("http://api:8080/change-password", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${session}`,
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 200) {
            const data = (await response.json()) as { message: string };
            throw new Error(data.message);
        }

        const { refreshedToken } = await response.json();
        cookies().set("session", refreshedToken);

        redirect("/welcome/success");
    }

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
                <FirstLoginForm
                    firstLoginResetPassword={firstLoginResetPassword}
                />
            </div>
        </section>
    );
}
