import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddResource() {
    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-xl font-bold">
                    Tela para adicionar recursos
                </h1>
                <Button>
                    <Link href="/">Voltar para home</Link>
                </Button>
            </div>
        </section>
    );
}
