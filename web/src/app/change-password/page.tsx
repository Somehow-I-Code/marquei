import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import ChangePasswordForm, {
    ChangePasswordFormSchema,
} from "./components/change-password-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getSession() {
    const session = cookies().get("session")?.value;

    if (!session) {
        return null;
    }

    return session;
}

export default async function ChangePasswordPage() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    async function changePassword(data: ChangePasswordFormSchema) {
        "use server";

        const body = {
            ...data,
            currentPassword: String(data.currentPassword),
            newPassword: String(data.newPassword),
            repeatPassword: String(data.repeatPassword),
        };

        const token = `Bearer ${session}`;

        const response = await fetch("http://api:8080/change-password", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: token,
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
