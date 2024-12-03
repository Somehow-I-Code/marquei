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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    currentPassword: z.string().min(8, {
        message: "A senha atual deve conter no mínimo 8 caracteres.",
    }),
    newPassword: z.string().min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});

export type UpdatePasswordFormSchema = z.infer<typeof FormSchema>;

type UpdatePasswordFormProps = {
    updatePassword: (data: UpdatePasswordFormSchema) => void;
};

export default function ChangePasswordForm({
    updatePassword,
}: UpdatePasswordFormProps) {
    const form = useForm<UpdatePasswordFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
        },
    });

    const { toast } = useToast();

    const router = useRouter();

    async function onSubmit(data: UpdatePasswordFormSchema) {
        try {
            await updatePassword(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "Senha alterada com sucesso.",
                action: (
                    <ToastAction
                        onClick={() => router.push("/profile")}
                        altText="Ir para o perfil"
                    >
                        Ir para o perfil.
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
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Senha antiga</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Digite sua senha atual"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                        <FormItem className="flex flex-col mb-2">
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
