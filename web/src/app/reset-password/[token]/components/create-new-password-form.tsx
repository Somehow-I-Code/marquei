"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

export type CreateNewPasswordFormSchema = z.infer<typeof FormSchema>;

export default function CreateNewPasswordForm() {
    const form = useForm<CreateNewPasswordFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            newPassword: "",
            repeatPassword: "",
        },
    });

    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        repeatPassword: false,
    });

    const passwordVisibility = (
        fieldName: keyof CreateNewPasswordFormSchema,
    ) => {
        setShowPassword({
            ...showPassword,
            [fieldName]: !showPassword[fieldName],
        });
    };

    function onSubmit(data: CreateNewPasswordFormSchema) {}

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
                                <div className="flex justify-between items-center">
                                    <Input
                                        id="newPassword"
                                        type={
                                            showPassword.newPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Digite sua nova senha"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            passwordVisibility("newPassword")
                                        }
                                        className="absolute right-8"
                                    >
                                        {showPassword.newPassword ? (
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

                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Repetir Senha</FormLabel>
                            <FormControl>
                                <div className="flex justify-between items-center">
                                    <Input
                                        id="repeatPassword"
                                        type={
                                            showPassword.repeatPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Repita sua nova senha"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            passwordVisibility("repeatPassword")
                                        }
                                        className="absolute right-8"
                                    >
                                        {showPassword.repeatPassword ? (
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

                <div className="space-y-2 flex flex-col">
                    <Button
                        type="submit"
                        className="bg-indigo-950 rounded-full text-base"
                    >
                        ALTERAR SENHA
                    </Button>
                    <Button
                        asChild
                        className="font-bold text-base text-indigo-950 bg-white border border-indigo-950"
                    >
                        <Link href="/login">VOLTAR PARA O LOGIN</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
