"use client";

import PasswordInput from "@/app/components/password-input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    newPassword: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
    repeatPassword: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
});

export type FirstLoginFormSchema = z.infer<typeof FormSchema>;

export default function FirstLoginForm() {
    const form = useForm<FirstLoginFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            newPassword: "",
            repeatPassword: "",
        },
    });

    function onSubmit(data: FirstLoginFormSchema) {}
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Nova Senha</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Digite sua nova senha" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Repetir Senha</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Repita sua nova senha" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2 flex flex-col">
                    <Button
                        type="submit"
                        className="bg-indigo-950 rounded-full text-base"
                    >
                        ATUALIZAR SENHA
                    </Button>
                </div>
            </form>
        </Form>
    );
}

