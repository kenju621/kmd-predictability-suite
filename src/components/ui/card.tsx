import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}
