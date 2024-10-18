"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email inválido."
    })
})

export type SendEmailFormSchema = z.infer<typeof FormSchema>;

export default function SendEmailForm() {
    const form = useForm<SendEmailFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: ""
        }
    })

    function onSubmit(data: SendEmailFormSchema) {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="pb-4">
                            <FormLabel className="font-bold">E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Digite seu email"
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
