"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "O nome do usuário não pode estar em branco",
    }),
    occupation: z.string().min(1, {
        message: "O cargo de ocupação não pode estar em branco",
    }),
    email: z.string().email({
        message: "Digite um e-mail válido",
    }),
    level: z.string().min(1, {
        message: "Selecione um dos níveis de perfil da lista",
    }),
});

export type NewProfileFormSchema = z.infer<typeof formSchema>;

type NewProfileFormProps = {
    levels: Array<string>;
    createProfile: (data: NewProfileFormSchema) => void;
};

export default function NewProfileForm({
    levels,
    createProfile,
}: NewProfileFormProps) {
    const form = useForm<NewProfileFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            occupation: "",
            email: "",
            level: "",
        },
    });

    function getLevelMessage(level: string) {
        switch (level) {
            case "USER":
                return "Gerencia agendamentos e recursos";
            case "ADMIN":
                return "Gerencia agendamentos, recursos e outros usuários";
            default:
                return null;
        }
    }

    const { toast } = useToast();

    const router = useRouter();

    async function onSubmit(data: NewProfileFormSchema) {
        try {
            await createProfile(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "Seu perfil foi criado com sucesso.",
                action: (
                    <ToastAction
                        onClick={() => router.push("/")}
                        altText="Ir para a home"
                    >
                        Ir para a home
                    </ToastAction>
                ),
            });
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Algo não deu certo!",
                    description: e.message,
                });
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col gap-2">
                                    <FormLabel htmlFor="name">Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Maria da Silva"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel htmlFor="occupation">
                                            Cargo de ocupação
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="occupation"
                                                type="text"
                                                placeholder="Secretária, gerente..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel htmlFor="email">
                                            E-mail
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="usuario@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel htmlFor="level">
                                            Nível de perfil
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        id="level"
                                                        placeholder="Escolha um nível de perfil"
                                                        {...field}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {levels.map((level) => {
                                                    return (
                                                        <SelectItem
                                                            key={level}
                                                            value={level}
                                                        >
                                                            {level}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {getLevelMessage(field.value)}
                                        </FormDescription>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            );
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button className="bg-indigo-950 font-bold">SALVAR</Button>

                    <Button
                        asChild
                        variant="outline"
                        className="border border-indigo-950 text-indigo-950 font-bold"
                    >
                        <Link href="/">CANCELAR</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
