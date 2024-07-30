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
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "O nome da empresa não pode estar vazio",
    }),
    isActive: z.boolean().default(true),
});

export type NewCompanyFormSchema = z.infer<typeof FormSchema>;

type NewCompanyFormProps = {
    createCompany: (data: NewCompanyFormSchema) => void;
};

export default function NewCompanyForm({ createCompany }: NewCompanyFormProps) {
    const form = useForm<NewCompanyFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            isActive: true,
        },
    });

    const { toast } = useToast();

    const router = useRouter();

    async function onSubmit(data: NewCompanyFormSchema) {
        try {
            await createCompany(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "A empresa foi cadastrado com sucesso!",
                action: (
                    <ToastAction
                        onClick={() => router.push("/")}
                        altText="Ir para a home"
                    >
                        Ir para a home
                    </ToastAction>
                ),
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
                                            placeholder="Gisele SPA das Unhas..."
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between">
                                    <FormLabel>Está ativo?</FormLabel>

                                    <FormControl>
                                        <Switch />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button className="bg-indigo-950 font-bold">SALVAR</Button>

                    <Button
                        asChild
                        variant="outline"
                        className="border border-indigo-950 text-indigo-950 font-bold"
                    >
                        <Link href="/">CANCELAR</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
