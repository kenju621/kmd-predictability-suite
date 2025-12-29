"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

export function TopNav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "rounded-full px-3 py-1 hover:text-slate-100 hover:bg-slate-900/60 transition-colors",
      pathname === href &&
        "bg-slate-100 text-slate-950 shadow-sm shadow-slate-900/60"
    );

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-kmd.svg"
          alt="KMD"
          width={32}
          height={32}
          className="h-8 w-8 rounded-xl bg-slate-50/5 p-1"
        />
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
            KMD Systems Lab
          </p>
          <p className="text-sm text-slate-300">
            Universal Context & Permissions · Case Studies
          </p>
        </div>
      </div>
      <nav
        className="flex items-center gap-2 text-xs text-slate-400"
        aria-label="Primary"
      >
        <Link href="/" className={linkClass("/")}>
          Overview
        </Link>
        <Link href="/demo" className={linkClass("/demo")}>
          Identity demo
        </Link>
        <Link href="/permissions" className={linkClass("/permissions")}>
          Permissions demo
        </Link>
        <Link href="/activity" className={linkClass("/activity")}>
          Activity demo
        </Link>
      </nav>

    </header>
  );
}
