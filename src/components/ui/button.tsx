"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]",
  {
    variants: {
      variant: {
        solid:
          "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-500",
        outline:
          "border border-slate-600 text-slate-100 hover:bg-slate-900/50 focus-visible:ring-slate-500",
        subtle:
          "bg-slate-800/80 text-slate-100 hover:bg-slate-800 focus-visible:ring-slate-500",
        ghost:
          "text-slate-100 hover:bg-slate-800/80 focus-visible:ring-slate-500",
      },
      size: {
        sm: "text-xs px-2",
        md: "text-sm px-3",
        lg: "text-sm px-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);


interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ children, className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
