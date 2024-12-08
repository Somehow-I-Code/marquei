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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    newPassword: z.string().min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});

export type FirstLoginFormSchema = z.infer<typeof FormSchema>;

type FirstLoginFormProps = {
    firstLoginResetPassword: (data: FirstLoginFormSchema) => void;
};

export default function FirstLoginForm({
    firstLoginResetPassword,
}: FirstLoginFormProps) {
    const form = useForm<FirstLoginFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            newPassword: "",
            repeatPassword: "",
        },
    });

    const { toast } = useToast();

    async function onSubmit(data: FirstLoginFormSchema) {
        try {
            await firstLoginResetPassword(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "Senha atualizada com sucesso.",
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
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Nova senha</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Digite sua nova senha"
                                    {...field}
                                />
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
                            <FormLabel>Repita a nova senha</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Repita sua nova senha"
                                    {...field}
                                />
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
