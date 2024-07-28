import { redirect } from "next/navigation";
import CompanyLogo from "../../components/company-logo";
import CreateNewPasswordForm from "./components/create-new-password-form";

type CreateNewPasswordProps = {
    params: {
        token: string;
    };
};

export default function CreateNewPassword({ params }: CreateNewPasswordProps) {
    if (!params.token) {
        redirect("/reset-password");
    }

    return (
        <section className="px-6 py-12 flex flex-col flex-wrap gap-9">
            <div>
                <CompanyLogo />
            </div>

            <div className="">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Crie uma nova senha
                </h1>

                <div className="py-4">
                    <CreateNewPasswordForm />
                </div>
            </div>
        </section>
    );
}
