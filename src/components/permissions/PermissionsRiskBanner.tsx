"use client";

import React from "react";
import { AlertOctagon, AlertTriangle, ShieldCheck } from "lucide-react";
import { usePermissionsStore } from "../../store/permissionsStore";
import { computeRiskLevel } from "../../lib/permissions";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export function PermissionsRiskBanner() {
  const visibility = usePermissionsStore((s) => s.visibility);
  const role = usePermissionsStore((s) => s.role);
  const includeExternal = usePermissionsStore((s) => s.includeExternal);
  const allowReshare = usePermissionsStore((s) => s.allowReshare);

  const level = computeRiskLevel({
    visibility,
    role,
    includeExternal,
    allowReshare,
  });

  let Icon: React.ElementType = ShieldCheck;
  let containerClasses =
    "border-emerald-400/70 bg-emerald-500/15 text-emerald-50";
  let title = "Low sharing risk";
  let detail =
    "Audience is intentionally narrow and permissions are conservative. This is a steady default for work-in-progress content.";

  if (level === "medium") {
    Icon = AlertTriangle;
    containerClasses =
      "border-amber-400/70 bg-amber-500/18 text-amber-50";
    title = "Moderate sharing risk";
    detail =
      "This configuration balances reach and control. A quick review is helpful before sharing sensitive or time-bound information.";
  }

  if (level === "high") {
    Icon = AlertOctagon;
    containerClasses =
      "border-rose-400/80 bg-rose-500/20 text-rose-50";
    title = "High potential reach";
    detail =
      "This content can travel widely with strong permissions. Confirm that this level of visibility and control aligns with your intent.";
  }

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-2xl border px-3 py-2 text-xs",
        containerClasses
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-none" />
      <div className="space-y-0.5">
        <div className="flex flex-wrap items-center gap-1">
          <span className="font-semibold">{title}</span>
          <Badge className="border-current/40 bg-white/10 text-[9px] text-current">
            Permissions preview
          </Badge>
        </div>
        <p className="text-[11px] leading-snug opacity-95">{detail}</p>
      </div>
    </div>
  );
}
