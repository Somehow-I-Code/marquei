import Link from "next/link";

import { Button } from "@/components/ui/button";
import SuccessImage from "./assets/success.svg";

export default async function WelcomeSuccess() {
    return (
        <section className="mt-48">
            <div className="flex items-center justify-center ">
                <SuccessImage />
            </div>

            <div>
                <p className="flex col gap-y-12 p-12 items-center justify-center font-sans font-extrabold text-3xl text-indigo-950">
                    Tudo certinho!
                </p>
            </div>

            <div>
                <p className="flex col gap-6 items-center justify-center text-base font-bold text-indigo-950">
                    Pronto para começar a agendar?
                </p>

                <div className="flex flex-col p-6 gap-2">
                    <Button className="font-bold text-base">
                        {/* TODO: Adicionar caminho quando a aplicação estiver fazendo agendamentos */}
                        <Link href="">VAMOS LÁ!</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/">MAIS TARDE</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
