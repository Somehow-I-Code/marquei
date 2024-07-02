import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import ChangePasswordForm, {
    ChangePasswordFormSchema,
} from "./components/change-password-form";

export default async function ChangePasswordPage() {
    async function changePassword(data: ChangePasswordFormSchema) {
        "use server";

        const body = {
            ...data,
            currentPassword: String(data.currentPassword),
            newPassword: String(data.newPassword),
            repeatPassword: String(data.repeatPassword),
        };

        const token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyZGFzaWx2YUBlbWFpbC5jb20iLCJsZXZlbCI6IkFETUlOIiwiY29tcGFueUlkIjoxLCJpYXQiOjE3MTk4NjM0ODF9.1GCkjQ3RmOOvI12VnHZLd-d1MkhVW7wrsQ51kd0e0Hw";

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
