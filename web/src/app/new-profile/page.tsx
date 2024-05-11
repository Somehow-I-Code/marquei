import { revalidatePath } from "next/cache";
import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewProfileForm, {
    NewProfileFormSchema,
} from "./components/new-profile-form";

async function getLevels() {
    const response = await fetch("http://api:8080/levels");
    const data = await response.json();

    return data;
}

export default async function NewProfile() {
    const levels = await getLevels();

    async function createProfile(data: NewProfileFormSchema) {
        "use server";

        const body = {
            ...data,
        };

        const response = await fetch("http://api:8080/profiles", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 201) {
            const error = await response.json();
            throw new Error(error.message);
        }

        revalidatePath("/");
    }

    return (
        <section>
            <div className="px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Novo perfil</FormTitle>

                <NewProfileForm levels={levels} createProfile={createProfile} />
            </div>
        </section>
    );
}
