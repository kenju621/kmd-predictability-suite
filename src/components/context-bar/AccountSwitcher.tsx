"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useAccountStore, useCurrentAccount, useCurrentScenario } from "./AccountContextProvider";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function AccountSwitcher() {
  const accounts = useAccountStore((s) => s.accounts);
  const currentAccount = useCurrentAccount();
  const setCurrentAccount = useAccountStore((s) => s.setCurrentAccount);
  const scenario = useCurrentScenario();

  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border-slate-700 bg-slate-900/70 pr-3"
      >
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-slate-800">
            <Image
              src={currentAccount.avatarSrc}
              alt={currentAccount.label}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Active identity
            </span>
            <span className="text-sm font-medium text-slate-50">
              {currentAccount.label}
            </span>
          </div>
        </div>
        <ChevronDown className="ml-1 h-4 w-4 text-slate-400" />
      </Button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-64 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-xl">
          <p className="mb-2 px-2 text-xs text-slate-400">
            Choose the identity you intend to act as for this scenario.
          </p>
          <div className="space-y-1">
            {accounts.map((account) => {
              const isRecommended =
                scenario.recommendedAccountKind &&
                scenario.recommendedAccountKind === account.kind;

              const isActive = account.id === currentAccount.id;

              return (
                <button
                  key={account.id}
                  onClick={() => {
                    setCurrentAccount(account.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs transition-colors",
                    isActive
                      ? "bg-slate-800/90 text-slate-50"
                      : "bg-transparent text-slate-300 hover:bg-slate-900/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full bg-slate-800">
                      <Image
                        src={account.avatarSrc}
                        alt={account.label}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{account.label}</span>
                      <span className="text-[10px] text-slate-400">
                        {account.email}
                      </span>
                    </div>
                  </div>
                  {isRecommended && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                      Recommended
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// local React import
import React from "react";
