import { Button } from "@/components/ui/button";
import Link from "next/link";
import SuccessImage from "./assets/success.svg";
import getSession from "../utis/get-session";
import { redirect } from "next/navigation";

export default async function SuccessPasswordFirstLogin() {
    const session = getSession();

    if (!session) {
        return redirect("/login");
    }

    return (
        <section className="mt-48">
            <div className="flex items-center justify-center ">
                <SuccessImage />
            </div>

            <div>
                <p className="flex flex col gap-y-12 p-12 items-center justify-center font-sans font-extrabold text-3xl text-indigo-950">
                    Tudo certinho!
                </p>
            </div>

            <div>
                <p className="flex flex col gap-6 items-center justify-center text-base font-bold text-indigo-950">
                    Pronto para começar a agendar?
                </p>

                <div className="flex flex-col p-6 gap-2">
                    <Button className="font-bold text-base">
                        {/* TODO: Adicionar caminho quando a aplicação estiver fazendo agendamentos */}
                        <Link href="">VAMOS LÁ!</Link>
                    </Button>
                    <Button
                        asChild
                        className="font-bold text-base bg-white text-indigo-950 border border-indigo-950"
                    >
                        <Link href="/">MAIS TARDE</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
