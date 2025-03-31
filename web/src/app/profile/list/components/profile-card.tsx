"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { DecodedProfile } from "@/types/profiles";
import Link from "next/link";

type ProfileCardProps = {
    profile: {
        id: number;
        name: string;
        email: string;
        level: string;
        occupation: string;
        isActive: boolean;
    };
    deactivateProfile: (id: number) => void;
    activateProfile: (id: number) => void;
    loggedUser: DecodedProfile | null;
    sudoLogin: (email: string) => void;
    deleteProfile: (id: number) => void;
};

export default function ProfileCard({
    profile,
    deactivateProfile,
    activateProfile,
    loggedUser,
    sudoLogin,
    deleteProfile,
}: ProfileCardProps) {
    const { toast } = useToast();

    function generateInitials() {
        const names = profile.name.split(" ");
        const reversedNames = names.toReversed();
        const initials = `${names[0][0]}${reversedNames[0][0]}`;

        return initials.toUpperCase();
    }

    async function handleDeactivateProfile() {
        try {
            await deactivateProfile(profile.id);

            toast({
                title: "Perfil desativado!",
                description: "O perfil foi desativado com sucesso.",
            });
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Erro ao desativar perfil!",
                    description: e.message,
                });
            }
        }
    }

    async function handleActivateProfile() {
        try {
            await activateProfile(profile.id);

            toast({
                title: "Perfil ativar!",
                description: "O perfil foi ativado com sucesso.",
            });
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Erro ao desativar perfil!",
                    description: e.message,
                });
            }
        }
    }

    async function handleSudoLogin() {
        try {
            await sudoLogin(profile.email);

            toast({
                title: "Logado como outro usuário!",
                description: `Agora você está acessando a plataforma como ${profile.name}.`,
            });
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Erro ao logar como outro usuário!",
                    description: e.message,
                });
            }
        }
    }

    async function handleDeleteProfile() {
        try {
            await deleteProfile(profile.id);

            toast({
                title: "Perfil excluído!",
                description: "O perfil foi excluído com sucesso.",
            });
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Erro ao excluir perfil!",
                    description: e.message,
                });
            }
        }
    }

    return (
        <div className="px-2">
            <Card className="border-slate-400">
                <CardHeader className="flex flex-row gap-4">
                    <Avatar className="flex w-24 h-24">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gray-100">
                            <div className="text-slate-950 text-3xl">
                                {generateInitials()}
                            </div>
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center gap-1">
                        <h1 className="font-semibold text-2xl">
                            {profile.name}
                        </h1>
                        <h2 className="font-medium text-xs text-slate-600">
                            {profile.email}
                        </h2>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-2">
                    <div>
                        <Badge className=" bg-green-200 text-green-950 text-base font-medium justify-center px-8 py-1">
                            {profile.level}
                        </Badge>
                    </div>
                    <h1 className="text-base text-slate-600 font-medium">
                        {profile.occupation}
                    </h1>
                </CardContent>

                <CardFooter>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-blue-500">
                                Ações disponíveis
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-5 text-slate-600 text-base mt-3">
                                <Link href="" className="underline">
                                    Editar perfil
                                </Link>

                                {loggedUser?.level === "SUDO" ? (
                                    <Button
                                        variant="outline"
                                        className="rounded-lg"
                                        onClick={handleSudoLogin}
                                    >
                                        LOGAR COMO ESSE USUÁRIO
                                    </Button>
                                ) : null}

                                {profile.isActive ? (
                                    <Button
                                        className="bg-transparent text-rose-600 border border-rose-600 rounded-lg"
                                        onClick={handleDeactivateProfile}
                                    >
                                        DESATIVAR PERFIL
                                    </Button>
                                ) : (
                                    <Button
                                        className="rounded-lg"
                                        onClick={handleActivateProfile}
                                    >
                                        ATIVAR PERFIL
                                    </Button>
                                )}

                                <Button
                                    variant="danger"
                                    className="rounded-lg"
                                    onClick={handleDeleteProfile}
                                >
                                    EXCLUIR PERFIL
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>
            </Card>
        </div>
    );
}
