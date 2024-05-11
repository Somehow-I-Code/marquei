"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    oldPassword: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
    newPassword: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
    repeatPassword: z.string().min(8, {
        message: "Sua senha deve conter no mínimo 8 caracteres",
    }),
});

export type ChangePasswordFormSchema = z.infer<typeof FormSchema>;

export default function ChangePasswordForm() {
    const form = useForm<ChangePasswordFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
        },
    });

    function onSubmit(data: ChangePasswordFormSchema) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Senha antiga</FormLabel>
                            <FormControl>
                                <div className="flex justify-between items-center">
                                    <Input
                                        type="password"
                                        placeholder="Digite sua senha antiga"
                                        {...field}
                                    />
                                    <Eye className="absolute right-8" />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Nova senha </FormLabel>
                            <FormControl>
                                <div className="flex justify-between items-center">
                                    <Input
                                        type="password"
                                        placeholder="Digite sua nova senha"
                                        {...field}
                                    />
                                    <Eye className="absolute right-8" />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mb-2">
                            <FormLabel>Repita a nova senha</FormLabel>
                            <FormControl>
                                <div className="flex justify-between items-center">
                                    <Input
                                        type="password"
                                        placeholder="Digite sua nova senha"
                                        {...field}
                                    />
                                    <Eye className="absolute right-8" />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2">
                    <Button type="submit" className="font-bold text-base">
                        ALTERAR SENHA
                    </Button>
                    <Button
                        asChild
                        className="font-bold text-base text-indigo-950 bg-white border border-indigo-950"
                    >
                        <Link href="/profile">VOLTAR PARA O PERFIL</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
