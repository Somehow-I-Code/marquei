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
    userName: z.string().min(1, {
        message: "O nome do usuário não pode estar em branco",
    }),
    occupationPosition: z.string().min(1, {
        message: "O cargo de ocupação não pode estar em branco",
    }),
    email: z.string().email({
        message: "Digite um e-mail válido",
    }),
    profileLevel: z.string().min(1, {
        message: "Selecione um dos níveis de perfil da lista",
    }),
});

export default function NewAccountForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            occupationPosition: "",
            email: "",
            profileLevel: "",
        },
    });

    function OnSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col gap-2">
                                    <FormLabel htmlFor="userName">
                                        Nome
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="userName"
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
                        name="occupationPosition"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel htmlFor="occupationPosition">
                                            Cargo de ocupação
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="occupationPosition"
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
