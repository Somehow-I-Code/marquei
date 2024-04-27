import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CompanyLogo from "../components/company-logo";
import FormTitle from "../components/form-title";

export default function NewResource() {
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="p-6 flex flex-col gap-12">
                <FormTitle>Novo recurso</FormTitle>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="Name">Nome</Label>
                            <Input
                                type="Nome"
                                placeholder="Dr. Paulo, Quadra 01..."
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="Category">Categoria</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Médicos, areia..." />
                                </SelectTrigger>
                                <SelectContent></SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="Description">Descrição</Label>
                            <Textarea placeholder="Neurologista, atende pela Unimed. Quadra de areia para beach tênis..." />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button className="bg-indigo-950 text-base font-bold">
                            SALVAR
                        </Button>

                        <Button className="border border-indigo-950 bg-white text-indigo-950 text-base font-bold">
                            CANCELAR
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
