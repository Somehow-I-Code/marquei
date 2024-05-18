import CompanyLogo from "../components/company-logo";
import LoginForm from "./components/login-form";

export default function LoginPage() {
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
                    <LoginForm login={() => {}} />
                </div>
            </div>
        </div>
    );
}
