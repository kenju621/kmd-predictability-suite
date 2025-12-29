// src/components/context-bar/AccountContextBar.tsx
"use client";

import { Card } from "../ui/card";
import { AccountSwitcher } from "./AccountSwitcher";
import { DeviceIndicator } from "./DeviceIndicator";
import { AccountWarnings } from "./AccountWarnings";

export function AccountContextBar() {
  return (
    <Card
      className="relative z-10 w-full max-w-full rounded-2xl border-slate-800 bg-slate-950/80 px-3 py-2 flex flex-col gap-2"
    >
      {/* Top row: identity + device + helper text */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <AccountSwitcher />
          <DeviceIndicator />
        </div>
        <p className="text-[11px] text-slate-300 md:ml-3 md:border-l md:border-slate-800 md:pl-3">
          Active identity and device for this surface. Changes here apply across
          connected apps.
        </p>
      </div>

      {/* Second row: warnings / context, always full-width under identity */}
      <div className="mt-1">
        <AccountWarnings />
      </div>
    </Card>
  );
}
