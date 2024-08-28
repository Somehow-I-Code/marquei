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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    email: z.string().email({
        message: "Digite um e-mail válido",
    }),
    password: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
});

export type LoginFormSchema = z.infer<typeof FormSchema>;

type LoginFormProps = {
    login: (credentials: LoginFormSchema) => Promise<void>;
};

export default function LoginForm({ login }: LoginFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(credentials: LoginFormSchema) {
        try {
            await login(credentials);
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
                className="flex flex-col"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="pb-4">
                            <FormLabel className="font-bold">E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="pb-2 relative">
                            <FormLabel className="font-bold">Senha</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Digite sua senha"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link
                    href="/reset-password"
                    className=" underline text-blue-400 text-xs pb-6"
                >
                    Esqueceu sua senha?
                </Link>
                <Button type="submit" className="bg-indigo-950 rounded-full">
                    Entrar
                </Button>
            </form>
        </Form>
    );
}

