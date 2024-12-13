import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePasswordForm, {
    UpdatePasswordFormSchema,
} from "./components/update-password-form";

export default async function UpdatePasswordPage() {
    async function updatePassword(data: UpdatePasswordFormSchema) {
        "use server";

        const body = {
            ...data,
        };

        const session = cookies().get("session")?.value;

        const response = await fetch("http://api:8080/auth/update-password", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${session}`,
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 200) {
            if (response.status === 401) {
                cookies().delete("session");
                redirect("/login");
            }

            const data = await response.json();
            throw new Error(data.message);
        }

        const { refreshedToken } = await response.json();
        cookies().set("session", refreshedToken);
    }

    return (
        <div className="flex flex-col p-6 gap-12">
            <h1 className="text-3xl font-bold text-indigo-950">
                Alterar sua senha
            </h1>

            <UpdatePasswordForm updatePassword={updatePassword} />
        </div>
    );
}
