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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    currentPassword: z.string().min(8, {
        message: "A senha atual deve conter no mínimo 8 caracteres",
    }),
    newPassword: z.string().min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres",
    }),
    repeatPassword: z.string().min(8, {
        message: "A senha repetida deve conter no mínimo 8 caracteres",
    }),
});

export type ChangePasswordFormSchema = z.infer<typeof FormSchema>;

type ChangePasswordFormProps = {
    changePassword: (data: ChangePasswordFormSchema) => void;
};

export default function ChangePasswordForm({
    changePassword,
}: ChangePasswordFormProps) {
    const form = useForm<ChangePasswordFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
        },
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        repeatPassword: false,
    });

    const passwordVisibility = (fieldName: keyof ChangePasswordFormSchema) => {
        setShowPassword({
            ...showPassword,
            [fieldName]: !showPassword[fieldName],
        });
    };

    const { toast } = useToast();

    const router = useRouter();

    async function onSubmit(data: ChangePasswordFormSchema) {
        try {
            await changePassword(data);

            form.reset();

            toast({
                title: "Ótimo!",
                description: "Senha alterada com sucesso",
                action: (
                    <ToastAction
                        onClick={() => router.push("/profile")}
                        altText="Ir para o perfil"
                    >
                        Ir para o perfil
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
                                <div className="flex justify-between items-center">
                                    <Input
                                        id="currentPassword"
                                        type={
                                            showPassword.currentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Digite sua senha atual"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            passwordVisibility(
                                                "currentPassword",
                                            )
                                        }
                                        className="absolute right-8"
                                    >
                                        {showPassword.currentPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
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
                                <div className="flex justify-between items-center">
                                    <Input
                                        id="newPassword"
                                        type={
                                            showPassword.newPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Digite sua nova senha"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            passwordVisibility("newPassword")
                                        }
                                        className="absolute right-8"
                                    >
                                        {showPassword.newPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
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
                                <div className="flex justify-between items-center">
                                    <Input
                                        id="repeatPassword"
                                        type={
                                            showPassword.repeatPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Repita sua nova senha"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            passwordVisibility("repeatPassword")
                                        }
                                        className="absolute right-8"
                                    >
                                        {showPassword.repeatPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
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
