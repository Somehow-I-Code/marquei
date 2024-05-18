import CompanyLogo from "../components/company-logo";
import LoginForm, { LoginFormSchema } from "./components/login-form";

export default function LoginPage() {
    async function login(credentials: LoginFormSchema) {
        "use server";
        const response = await fetch("http://api:8080/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status !== 200) {
            const data = (await response.json()) as { message: string };
            throw new Error(data.message);
        }

        const data = (await response.json()) as { token: string };
        return data.token;
    }

    return (
        <div className="px-6 py-12 flex flex-col flex-wrap gap-4">
            <CompanyLogo />
            <div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold pt-12">
                        Precisa agendar?
                    </h1>
                    <h2>Acesse sua conta agora mesmo!</h2>
                </div>
                <div className="pt-8">
                    <LoginForm login={login} />
                </div>
            </div>
        </div>
    );
}
