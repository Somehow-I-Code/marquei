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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "O nome da empresa não pode estar vazio",
    }),
    isActive: z.boolean().default(false),
});

export type NewCompanyFormSchema = z.infer<typeof FormSchema>;

export default function NewCompanyForm() {
    const form = useForm<NewCompanyFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            isActive: false,
        },
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6">
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
