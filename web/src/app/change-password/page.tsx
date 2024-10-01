import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import ChangePasswordForm, {
    ChangePasswordFormSchema,
} from "./components/change-password-form";
import { redirect } from "next/navigation";
import getSession from "../utis/get-session";

export default async function ChangePasswordPage() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    async function changePassword(data: ChangePasswordFormSchema) {
        "use server";

        const body = {
            ...data,
        };

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

        revalidatePath("/profile");
    }

    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>

            <div className="flex flex-col p-6 gap-12">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Alterar sua senha
                </h1>

                <ChangePasswordForm changePassword={changePassword} />
            </div>
        </section>
    );
}
