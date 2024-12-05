import { Button } from "@/components/ui/button";
import Link from "next/link";
import CompanyLogo from "../../../components/company-logo";
import Salute from "../../../components/salute";
import Scheduling from "../resource/list/assets/scheduling.svg";

export default function EmptyResourcesList() {
    return (
        <>
            <header className="flex justify-between items-end px-6 py-12">
                <CompanyLogo />
                <Salute>{"Usuário"}</Salute>
            </header>

            <section>
                <div className="w-full max-w-sm mx-auto text-wrap bg-slate-100 p-4 rounded-lg">
                    <p className="text-gray-950 text-base font-semibold p-2">
                        Ahh não! Você ainda não tem nenhum recurso para agendar.
                    </p>
                </div>

                <div className="flex justify-center items-center p-6">
                    <Scheduling />
                </div>

                <div className="flex justify-center items-center p-2">
                    <Button className="px-8 py-6 text-sm font-bold">
                        {/* TODO: Vai para tela de agendamento */}
                        <Link href="">CRIAR PRIMEIRO AGENDAMENTO</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
