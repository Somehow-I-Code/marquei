import { redirect } from "next/navigation";
import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import getSession from "../utis/get-session";
import NewProfileForm, {
    NewProfileFormSchema,
} from "./components/new-profile-form";
import { Company } from "@/types/companies";
import { jwtDecode } from "jwt-decode";
import { notFound } from "next/navigation";

async function getLevels(token: string): Promise<Array<string>> {
    const response = await fetch("http://api:8080/levels", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    return data;
}

async function getCompanies(token: string): Promise<Array<Company>> {
    const response = await fetch("http://api:8080/companies", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const data = await response.json();

    return data;
}

export default async function NewProfile() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    const decoded = jwtDecode(session) as {
        level: string;
    };
    
    if (decoded.level === "USER") {
        return notFound();
    }

    const levels = await getLevels(session);
    const companies = await getCompanies(session);
        
    async function createProfile(data: NewProfileFormSchema) {
        "use server";

        const body = {
            ...data,
            companyId: Number(data.companyId),
        };

        const response = await fetch("http://api:8080/profiles", {
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${session}`,
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 201) {
            const error = await response.json();
            throw new Error(error.message);
        }

        // TODO: revalidar a tela com a lista de todos os perfis
    }

    return (
        <section>
            <div className="px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Novo perfil</FormTitle>
                <NewProfileForm levels={levels} createProfile={createProfile} companies={companies} />
            </div>
        </section>
    );
}
