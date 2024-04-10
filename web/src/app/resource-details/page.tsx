import { Button } from "@/components/ui/button";
import Link from "next/link";
import BottomFloatingMenu from "../components/bottom-floating-menu";
import CompanyLogo from "../components/company-logo";

export default function ResourceDetails() {
    return (
        <section>
            <div className="flex justify-between items-end px-6 py-12">
                <Link href="/">
                    <CompanyLogo />
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-xl font-bold">
                    Tela para ver detalhes do recurso
                </h1>
                <Button>
                    <Link href="/">Voltar para home</Link>
                </Button>
            </div>

            <div>
                //lembrar de adicionar os dados que estão sendo passados em
                resources
                <BottomFloatingMenu resources={{}} />
            </div>
        </section>
    );
}
