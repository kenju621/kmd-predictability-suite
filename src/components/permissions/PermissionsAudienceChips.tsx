// src/components/permissions/PermissionsAudienceChips.tsx
"use client";

import React from "react";
import { usePermissionsStore } from "../../store/permissionsStore";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function PermissionsAudienceChips() {
  const includeExternal = usePermissionsStore((s) => s.includeExternal);
  const allowReshare = usePermissionsStore((s) => s.allowReshare);
  const restrictDownload = usePermissionsStore((s) => s.restrictDownload);

  const setIncludeExternal = usePermissionsStore((s) => s.setIncludeExternal);
  const setAllowReshare = usePermissionsStore((s) => s.setAllowReshare);
  const setRestrictDownload = usePermissionsStore(
    (s) => s.setRestrictDownload
  );

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        Audience & controls
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={includeExternal ? "outline" : "solid"}
          className={cn(
            "rounded-full px-3 py-1 text-[11px]",
            !includeExternal &&
              "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
          )}
          onClick={() => setIncludeExternal(false)}
        >
          Internal only
        </Button>
        <Button
          size="sm"
          variant={includeExternal ? "solid" : "outline"}
          className={cn(
            "rounded-full px-3 py-1 text-[11px]",
            includeExternal &&
              "bg-sky-500 text-slate-950 hover:bg-sky-400"
          )}
          onClick={() => setIncludeExternal(true)}
        >
          Includes external collaborators
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px]">
        <TogglePill
          active={allowReshare}
          label="Allow resharing"
          onClick={() => setAllowReshare(!allowReshare)}
        />
        <TogglePill
          active={restrictDownload}
          label="Restrict downloads"
          onClick={() => setRestrictDownload(!restrictDownload)}
        />
      </div>
    </div>
  );
}

function TogglePill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 transition-colors",
        active
          ? "border-sky-500 bg-sky-500/10 text-sky-200"
          : "border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-900"
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          active ? "bg-sky-400" : "bg-slate-500"
        )}
      />
      <span>{label}</span>
    </button>
  );
}
