"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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
import Link from "next/link";
import CompanyLogo from "../components/company-logo";

const FormSchema = z.object({
    email: z.string().email({
        message: "Digite um e-mail válido",
    }),
    password: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
});

export default function LoginForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    function onSubmit(data: z.infer<typeof FormSchema>) {}

    return (
        <div className="px-6 py-12 flex flex-col flex-wrap gap-4">
            <div>
                <CompanyLogo />
            </div>
            <div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold pt-12">
                        Precisa agendar?
                    </h1>
                    <h2>Acesse sua conta agora mesmo!</h2>
                </div>
                <div className="pt-8">
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
                                        <FormLabel className="font-bold">
                                            E-mail
                                        </FormLabel>
                                        <FormControl>
                                            <Input
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
                                        <FormLabel className="font-bold">
                                            Senha
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className=""
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Digite sua senha"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
                            <Button
                                type="submit"
                                className="bg-indigo-950 rounded-full"
                            >
                                Entrar
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

