import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CompanyLogo from "../components/company-logo";

export default function NewCategory() {
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="flex flex-col p-6 gap-12">
                <div>
                    <h2 className="text-3xl font-semibold text-indigo-950">
                        Nova Categoria
                    </h2>
                </div>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="NameCategory">Nome da categoria</Label>
                        <Input
                            type="nome-categoria"
                            placeholder="Digite o nome da categoria"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button className="bg-indigo-950 text-white">
                            SALVAR
                        </Button>

                        <Button className="bg-white text-indigo-950 border border-indigo-950">
                            <Link href="/">CANCELAR</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
