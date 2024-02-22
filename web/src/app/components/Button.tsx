import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "transparent" | "white";
}

const styles = {
  primary: "bg-indigo-950",
  transparent: "bg-transparent",
  white: "bg-white"
};

export default function Button({
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`py-1 px-2 ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
