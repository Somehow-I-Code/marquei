import { revalidatePath } from "next/cache";
import CompanyLogo from "../../components/company-logo";
import CreateNewPasswordForm, {
    CreateNewPasswordFormSchema,
} from "./components/create-new-password-form";
import { redirect } from "next/navigation";

type CreateNewPasswordProps = {
    params: {
        token: string;
    };
};

export default async function CreateNewPassword({
    params,
}: CreateNewPasswordProps) {
    if (!params.token) {
        return redirect("/reset-password");
    }

    async function createNewPassword(data: CreateNewPasswordFormSchema) {
        "use server";

        const body = {
            ...data,
            token: params.token,
        };

        const response = await fetch("http://api:8080/change-password", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 200) {
            const data = (await response.json()) as { message: string };
            throw new Error(data.message);
        }

        revalidatePath("/login");
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
                    <CreateNewPasswordForm
                        createNewPassword={createNewPassword}
                    />
                </div>
            </div>
        </section>
    );
}
