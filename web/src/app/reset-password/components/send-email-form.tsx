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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    email: z.string().email({
        message: "Email inválido.",
    }),
});

export type SendEmailFormSchema = z.infer<typeof FormSchema>;

type SendEmailFormProps = {
    requestPasswordReset: (data: SendEmailFormSchema) => void;
};

export default function SendEmailForm({
    requestPasswordReset,
}: SendEmailFormProps) {
    const form = useForm<SendEmailFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    const { toast } = useToast();

    async function onSubmit(data: SendEmailFormSchema) {
        try {
            await requestPasswordReset(data);
            form.reset();

            toast({
                title: "Solicitação enviada!",
                description:
                    "Verifique seu email para continuar com a recuperação de senha.",
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Erro na solicitação!",
                description:
                    e instanceof Error
                        ? e.message
                        : "Ocorreu um erro ao tentar solicitar a recuperação de senha.",
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormLabel htmlFor="email" className="font-bold">
                                E-mail
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Digite seu email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-2">
                    <Button
                        type="submit"
                        className="bg-indigo-950 rounded-full font-bold text-base"
                    >
                        SOLICITAR RECUPERAÇÃO
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
