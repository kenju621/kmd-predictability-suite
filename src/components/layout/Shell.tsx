import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_45%,_#000_100%)] text-slate-100"
      )}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10 xl:px-16 xl:py-12">
        {children}
      </div>
    </div>
  );
}
