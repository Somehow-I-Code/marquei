import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../components/company-logo";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Salute from "../components/salute";

async function getHello() {
    const response = await fetch("http://api:8080/hello");
    const data = await response.json();
    return data;
}

export default async function ProfilesList() {
    const greeting = await getHello();
    return (
        <section className="px-6 py-12 flex flex-col flex-wrap space-y-8">
            <div className="flex justify-between items-end">
                <CompanyLogo />
                <Salute>{greeting?.hello || "Usuário"}</Salute>
            </div>

            <div className="flex space-x-10">
                <h1 className="text-2xl font-semibold">Lista de Perfis</h1>
                <Button className="bg-indigo-950 font-bold">
                    <Link href="/new-profile">+ NOVO PERFIL</Link>
                </Button>
            </div>

            <div className="space-y-6">
                <Label htmlFor="procurar e-mail">Procurar perfil</Label>
                <div className="flex">
                    <Input
                        className="rounded-r-none"
                        placeholder="Busque por um perfil"
                    />
                    <Button className="bg-indigo-950 rounded-sm rounded-l-none">
                        <Search />
                    </Button>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex">
                            <Avatar className="flex w-20 h-20">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-indigo-200 text-3xl">
                                    MS
                                </AvatarFallback>
                            </Avatar>
                            <h1 className="font-bold text-2xl">
                                Maria da Silva
                            </h1>
                            <h2 className="font-light text-sm">
                                mariadasilva@marquei.com
                            </h2>
                        </CardHeader>
                        <CardContent className="space-y-2 font-medium">
                            <Badge className="bg-green-200 text-black w-20 justify-center">
                                ADMIN
                            </Badge>
                            <h1 className="text-sm w-20 flex items-center justify-center">
                                Gerente
                            </h1>
                        </CardContent>

                        <CardFooter>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-blue-500">
                                        Ações disponíveis
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col text-indigo-950 text-sm space-y-2">
                                        <Link href="">Editar perfil</Link>
                                        <Link href="">Pedir nova senha</Link>
                                        <Link href="">Desativar perfil</Link>
                                        <div className="flex">
                                            <Link href="">Excluir perfil</Link>
                                            <h1 className="ml-32 text-sm text-green-600">
                                                ATIVO
                                            </h1>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}

