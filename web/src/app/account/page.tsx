import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Account() {
    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-xl font-bold">Tela de Conta</h1>
                <Button>
                    <Link href="/">Voltar para home</Link>
                </Button>
            </div>
        </section>
    );
}
