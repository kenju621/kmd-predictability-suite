import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-100",
        className
      )}
    >
      {children}
    </span>
  );
}
