import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "transparent";
}

const styles = {
  primary: "px-4 py-2 rounded bg-purple-950",
  transparent: "px-4 py-2 rounded bg-transparent",
};

export default function Button({
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
