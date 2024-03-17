import { ReactNode } from "react";

type SaluteProps = {
    children: ReactNode;
};

export default function Salute({ children }: SaluteProps) {
    return (
        <span className="text-sm font-bold text-indigo-950">
            olá, {children}
        </span>
    );
}
