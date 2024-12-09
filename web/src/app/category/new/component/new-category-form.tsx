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
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "O nome da categoria não pode estar vazio.",
    }),
});

export type NewCategoryFormSchema = z.infer<typeof FormSchema>;

type NewCategoryFormProps = {
    createCategory: (data: NewCategoryFormSchema) => Promise<void>;
};

export default function NewCategoryForm({
    createCategory,
}: NewCategoryFormProps) {
    const form = useForm<NewCategoryFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    });

    const { toast } = useToast();

    const router = useRouter();

    async function onSubmit(data: NewCategoryFormSchema) {
        try {
            await createCategory(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "A categoria foi cadastrada com sucesso.",
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
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel htmlFor="name" className="flex gap-2">
                                Nome
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Médicos, Quadras, Manicures..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2">
                    <Button type="submit" className="text-base font-bold">
                        SALVAR
                    </Button>
                    <Button
                        asChild
                        className="bg-white text-indigo-950 text-base font-bold border border-indigo-950"
                    >
                        <Link href="/">CANCELAR</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
