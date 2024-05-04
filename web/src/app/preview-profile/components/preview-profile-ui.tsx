import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function PreviewProfile() {
    return (
        <section>
            <div className="flex flex-col p-24 gap-2">
                <Label className="flex items-center justify-center text-indigo-950 text-2xl font-bold mt-[-15px]">
                    Nome do usuário
                </Label>

                <Label className="flex items-center justify-center text-amber-600 font-semibold">
                    Cargo de ocupação
                </Label>
            </div>

            <div className="flex flex-col p-6 mt-[-75px]">
                <div className="flex items-center mb-2">
                    <Label className="text-gray-400 text-sm w-full">
                        E-mail
                    </Label>
                    <Label className="text-base">usuario@exemplo.com</Label>
                </div>
                <div className="flex items-center">
                    <Label className="text-gray-400 text-sm w-full">
                        Nível de perfil
                    </Label>
                    <Label className="text-base">user</Label>
                </div>
            </div>

            <div className="flex flex-col p-6 gap-2 mt-[-25px]">
                <Button className="font-bold text-base">
                    <Link href="">ALTERAR SENHA</Link>
                </Button>
                <Button className="font-bold text-base bg-white text-indigo-950 border border-indigo-950">
                    <Link href="/">VOLTAR</Link>
                </Button>
                <Button className="font-bold text-base bg-white text-rose-600 border border-rose-600">
                    <Link href="login">SAIR</Link>
                </Button>
            </div>
        </section>
    );
}
