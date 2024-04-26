import CompanyLogo from "../components/company-logo";
import NewCategoryForm, {
    NewCategoryFormSchema,
} from "./component/new-category-form";

export default function NewCategory() {
    async function name(data: NewCategoryFormSchema) {
        "use server";
        console.log(data);
    }
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="flex flex-col p-6 gap-12">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Nova Categoria
                </h1>

                <NewCategoryForm name={name} />
            </div>
        </section>
    );
}
