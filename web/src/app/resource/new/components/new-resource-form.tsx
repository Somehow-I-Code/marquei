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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Category } from "@/types/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "O nome do recurso não pode estar em branco.",
    }),
    category: z.string().min(1, {
        message: "Selecione uma das categorias da lista.",
    }),
    description: z.string().max(1000, {
        message: "A descrição está muito longa. Máximo de 1000 caracteres.",
    }),
});

export type NewResourceFormSchema = z.infer<typeof formSchema>;

type NewResourceFormProps = {
    categories: Array<Category>;
    createResource: (data: NewResourceFormSchema) => void;
};

export default function NewResourceForm({
    categories,
    createResource,
}: NewResourceFormProps) {
    const form = useForm<NewResourceFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            description: "",
        },
    });

    const { toast } = useToast();

    const router = useRouter();

    async function onSubmit(data: NewResourceFormSchema) {
        try {
            await createResource(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "Seu recurso foi cadastrado com sucesso.",
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
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel htmlFor="name">
                                            Nome
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Dr. Paulo, Quadra 01..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="category">
                                            Categoria
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        id="category"
                                                        placeholder="Médicos, areia..."
                                                        {...field}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => {
                                                    return (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={String(
                                                                category.id,
                                                            )}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel htmlFor="description">
                                            Descrição
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                placeholder="Neurologista, atende pela Unimed. Quadra de areia para beach tênis..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button className="bg-indigo-950 font-bold">SALVAR</Button>

                    <Button asChild variant="secondary">
                        <Link href="/">CANCELAR</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
