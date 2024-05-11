import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";
import NewProfileForm from "./components/new-profile-form";

async function getLevels() {
    const response = await fetch("http://api:8080/levels");
    const data = await response.json();

    return data;
}

export default async function NewProfile() {
    const levels = await getLevels();

    return (
        <section>
            <div className="px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-8">
                <FormTitle>Novo perfil</FormTitle>

                <NewProfileForm levels={levels} />
            </div>
        </section>
    );
}
