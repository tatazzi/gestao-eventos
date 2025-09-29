import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function Button({ children, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      className="w-full h-12 text-base font-semibold rounded-lg bg-brandPrimary text-white hover:bg-brandPrimary/80 transition-colors duration-200 cursor-pointer"
    >
      {children}
    </button>
  );
}
