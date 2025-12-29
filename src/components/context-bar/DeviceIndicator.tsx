"use client";

import { Monitor, Smartphone, Tv } from "lucide-react";
import { useCurrentDevice, useAccountStore } from "./AccountContextProvider";
import { Tooltip } from "../ui/tooltip";
import { cn } from "../../lib/utils";

export function DeviceIndicator() {
  const device = useCurrentDevice();
  const setCurrentDevice = useAccountStore((s) => s.setCurrentDevice);

  const icon =
    device.kind === "desktop"
      ? Monitor
      : device.kind === "mobile"
      ? Smartphone
      : Tv;

  const Icon = icon;

  const devices = useAccountStore((s) => s.devices);

  return (
    <div className="flex items-center gap-2">
      <Tooltip label={`Active device: ${device.label}`}>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80">
          <Icon className="h-4 w-4 text-slate-100" />
        </button>
      </Tooltip>

      <div className="hidden items-center gap-1 text-[11px] text-slate-400 sm:flex">
        {devices.map((d) => {
          const SmallIcon =
            d.kind === "desktop" ? Monitor : d.kind === "mobile" ? Smartphone : Tv;
          const active = d.id === device.id;
          return (
            <button
              key={d.id}
              onClick={() => setCurrentDevice(d.id)}
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 transition-colors",
                active
                  ? "bg-slate-100 text-slate-950"
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-700/80"
              )}
            >
              <SmallIcon className="h-3 w-3" />
              <span>{d.kind === "tv" ? "TV" : d.kind}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
