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
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
    profileLevel: z.string().min(1, {
        message: "Selecione um dos níveis de perfil da lista",
    }),
});

export type NewAccountFormSchema = z.infer<typeof formSchema>;

export default function NewAccountForm() {
    const form = useForm<NewAccountFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            occupation: "",
            email: "",
            profileLevel: "",
        },
    });

    function OnSubmit(data: NewAccountFormSchema) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(OnSubmit)}
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
                        name="profileLevel"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel htmlFor="profileLevel">
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
                                                        id="profileLevel"
                                                        placeholder="Escolha um nível de perfil"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                        </Select>
                                        <FormDescription>
                                            Consegue gerenciar agendamentos e
                                            recursos
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
                        className="border border-indigo-950 font-bold"
                    >
                        <Link href="/">CANCELAR</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
