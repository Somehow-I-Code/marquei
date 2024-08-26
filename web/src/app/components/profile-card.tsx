import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function ProfileCard() {
    return (
        <div className="px-2">
            <Card className="border-slate-400">
                <CardHeader className="flex flex-row gap-4">
                    <Avatar className="flex w-24 h-24">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gray-100">
                            <div className="text-slate-950 text-3xl">MS</div>
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center gap-1">
                        <h1 className="font-semibold text-2xl">
                            Maria da Silva
                        </h1>
                        <h2 className="font-medium text-xs text-slate-600">
                            mariadasilva@marquei.com
                        </h2>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-2">
                    <div>
                        <Badge className=" bg-green-200 text-green-950 text-base font-medium justify-center px-8 py-1">
                            ADMIN
                        </Badge>
                    </div>
                    <h1 className="text-base text-slate-600 font-medium">
                        Gerente
                    </h1>
                </CardContent>

                <CardFooter>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-blue-500">
                                Ações disponíveis
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-5 text-slate-600 text-base mt-3">
                                <Link href="">Editar perfil</Link>
                                <Link href="">Pedir nova senha</Link>
                                <div className="flex justify-between">
                                    <Link href="">Desativar perfil</Link>
                                    <h1 className="text-base text-slate-400 tracking-widest">
                                        ATIVO
                                    </h1>
                                </div>

                                <Link href="">Excluir perfil</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            </Card>
        </div>
    );
}

