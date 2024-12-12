import CompanyLogo from "./components/company-logo";
import Salute from "./components/salute";

export default async function HomePage() {
    return (
        <>
            <header className="flex justify-between items-end px-6 py-12">
                <CompanyLogo />
                <Salute />
            </header>

            <section>home page</section>
        </>
    );
}
