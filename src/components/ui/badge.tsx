import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-200",
        className
      )}
    >
      {children}
    </span>
  );
}
