import { readCookieData } from "@/app/actions";
import { Company } from "@/types/companies";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CompanyLogo from "../../components/company-logo";
import FormTitle from "../../components/form-title";
import NewProfileForm, {
    NewProfileFormSchema,
} from "./components/new-profile-form";

async function getLevels(): Promise<{ levels: Array<string> }> {
    const token = cookies().get("session")?.value;

    const response = await fetch("http://api:8080/profiles/levels", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        cookies().delete("session");
        redirect("/login");
    }

    const data = await response.json();

    return data;
}

async function getCompanies(): Promise<{ companies: Array<Company> }> {
    const token = cookies().get("session")?.value;

    const response = await fetch("http://api:8080/companies", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        cookies().delete("session");
        redirect("/login");
    }

    const data = await response.json();

    return data;
}

export default async function NewProfilePage() {
    const { levels } = await getLevels();
    const { companies } = await getCompanies();
    const loggedUser = await readCookieData();

    async function createProfile(data: NewProfileFormSchema) {
        "use server";

        const body = {
            ...data,
            companyId: Number(data.companyId),
        };

        const session = cookies().get("session")?.value;

        const response = await fetch("http://api:8080/profiles", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${session}`,
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 201) {
            if (response.status === 401) {
                cookies().delete("session");
                redirect("/login");
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        const { refreshedToken } = await response.json();
        cookies().set("session", refreshedToken);

        revalidatePath("/profile/list");
    }

    return (
        <section>
            <div className="px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Novo perfil</FormTitle>
                <NewProfileForm
                    levels={levels}
                    createProfile={createProfile}
                    companies={companies}
                    loggedUser={loggedUser}
                />
            </div>
        </section>
    );
}
