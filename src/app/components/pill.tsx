import { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
};

export default function Pill({ children }: PillProps) {
  return (
    <span className="block font-bold bg-indigo-950 text-white px-3 py-2 rounded-full">
      {children}
    </span>
  );
}
