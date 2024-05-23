"use client";

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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Definindo o esquema que quero de validação dos dados, um objeto contendo o email e o password, com suas repectivas mensagens
const FormSchema = z.object({
    email: z.string().email({
        message: "Digite um e-mail válido",
    }),
    password: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
});

// Inferindo o esquema de validação para o tipo LoginFormSchema
export type LoginFormSchema = z.infer<typeof FormSchema>;

// O LoginFormProps é um tipo, que contém o valor login, que é uma função que tem como parâmetro as credentials (email e password), esperando como promessa uma string
type LoginFormProps = {
    login: (credentials: LoginFormSchema) => Promise<string>;
};

//Não entendi pq o login tem que estar entre {}
export default function LoginForm({ login }: LoginFormProps) {
    // Atribuindo a função useRouter para a variável router para ser usando posteriormente
    const router = useRouter();

    // Atribuindo a função useToast para a variável toast para ser usando posteriormente, não sei pq o toast tem que estar entre {}
    const { toast } = useToast();

    // Não está muito claro pra mim, mas pelo que eu entendi está usando ao função useForm para para definir valores padrões vazios pro email e password
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Não entendi direito, mas pelo que interpretei é um array que contém um a variável como valor inicial, não sei bem se setShowPAssword é uma função, que recebe a função useState como parâmetro o false
    const [showPassword, setShowPassword] = useState(false);

    async function onSubmit(credentials: LoginFormSchema) {
        try {
            // 1 - Chamar a função que comunica com o backend
            // Esperando a execução da função login e atribuindo o resultado ao token
            const token = await login(credentials);

            // 7 - Criar sessão
            // Não entendi bem, mas acho que estou guardando na localStorage o token
            localStorage.setItem("marquei-token", token);

            // 5 - Se certo - redireciona
            // Se o usuário conseguiu logar redirecionar pra home
            router.push("/");
        } catch (e) {
            // 6 - Se errado - toast erro (limpar senha)
            // Se não conseguir logar, mostrar mensagem de erro
            if (e instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Oh não!",
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
                                <div className="flex justify-between items-center">
                                    <Input
                                        type={
                                            // Não entendi muito bem como funiona o useState
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Digite sua senha"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
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
