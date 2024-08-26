import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../components/company-logo";
import Salute from "../components/salute";

async function getHello() {
    const response = await fetch("http://api:8080/hello");
    const data = await response.json();
    return data;
}

export default async function ProfilesList() {
    const greeting = await getHello();
    return (
        <section className="my-12 mx-6 flex flex-col gap-12">
            <div className="flex justify-between items-end">
                <CompanyLogo />
                <Salute>{greeting?.hello || "Usuário"}</Salute>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Lista de Perfis</h1>
                <Button className="bg-indigo-950 font-bold gap-2">
                    <Plus />

                    <Link className="text-xs" href="/new-profile">
                        NOVO PERFIL
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                <Label
                    className="text-sm font-semibold"
                    htmlFor="procurar e-mail"
                >
                    Procurar perfil
                </Label>
                <div className="flex">
                    <Input
                        className="rounded-r-none"
                        placeholder="Busque por um perfil"
                    />
                    <Button className="bg-indigo-950 rounded-sm rounded-l-none">
                        <Search />
                    </Button>
                </div>
            </div>

            <div className="px-2">
                <Card className="border-slate-400">
                    <CardHeader className="flex flex-row gap-4">
                        <Avatar className="flex w-24 h-24">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gray-100">
                                <div className="text-slate-950 text-3xl">
                                    MS
                                </div>
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
        </section>
    );
}
