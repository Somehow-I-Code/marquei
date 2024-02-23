import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="block font-bold bg-indigo-950 text-white px-3 py-2 rounded-full">
      {children}
    </span>
  );
}
