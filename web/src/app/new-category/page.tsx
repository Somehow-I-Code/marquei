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
import CompanyLogo from "../components/company-logo";

const formSchema = z.object({
    name: z.string(),
});

export default function NewCategory() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    return (
        <section>
            <div className="h-40 px-6 py-12">
                <CompanyLogo />
            </div>
            <div className="flex flex-col p-6 gap-12">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Nova Categoria
                </h1>

                <Form {...form}>
                    <form className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel className="flex gap-2">
                                        Nome
                                    </FormLabel>
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
                            <Button
                                className="text-base font-bold"
                                type="submit"
                            >
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
            </div>
        </section>
    );
}
