import { ReactNode } from "react";

type FormTitleProps = {
    children: ReactNode;
};

export default function FormTitle({ children }: FormTitleProps) {
    return <h1 className="font-bold text-3xl text-indigo-950">{children}</h1>;
}
