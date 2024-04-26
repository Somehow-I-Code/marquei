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

const FormSchema = z.object({
    name: z.string(),
});

export type NewCategoryFormSchema = z.infer<typeof FormSchema>;

type NewCategoryFormProps = {
    name: (data: NewCategoryFormSchema) => void;
};

export default function NewCategoryForm({ name }: NewCategoryFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(data: NewCategoryFormSchema) {
        name(data);
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
                            <FormLabel className="flex gap-2">Nome</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Médicos, Quadras, Manicures..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-2">
                    <Button className="text-base font-bold" type="submit">
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
