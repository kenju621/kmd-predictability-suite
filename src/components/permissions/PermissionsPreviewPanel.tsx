// src/components/permissions/PermissionsPreviewPanel.tsx
"use client";

import React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { usePermissionsStore } from "../../store/permissionsStore";
import {
  ROLE_OPTIONS,
  VISIBILITY_OPTIONS,
  roleLabel,
  visibilityLabel,
} from "../../lib/permissions";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { PermissionsRiskBanner } from "./PermissionsRiskBanner";
import { PermissionsAudienceChips } from "./PermissionsAudienceChips";
import { cn } from "../../lib/utils";

export function PermissionsPreviewPanel() {
  const visibility = usePermissionsStore((s) => s.visibility);
  const role = usePermissionsStore((s) => s.role);
  const includeExternal = usePermissionsStore((s) => s.includeExternal);
  const allowReshare = usePermissionsStore((s) => s.allowReshare);
  const restrictDownload = usePermissionsStore(
    (s) => s.restrictDownload
  );

  const setVisibility = usePermissionsStore((s) => s.setVisibility);
  const setRole = usePermissionsStore((s) => s.setRole);

  const visLabel = visibilityLabel(visibility);
  const roleLabelText = roleLabel(role);

  const audienceSummaryParts: string[] = [];

  if (visibility === "private") {
    audienceSummaryParts.push("only you");
  } else if (visibility === "team") {
    audienceSummaryParts.push("a specific team");
  } else if (visibility === "org") {
    audienceSummaryParts.push("everyone in your org");
  } else if (visibility === "link") {
    audienceSummaryParts.push("anyone with the link");
  } else if (visibility === "public") {
    audienceSummaryParts.push("anyone on the internet");
  }

  if (includeExternal) {
    audienceSummaryParts.push("including external collaborators");
  } else {
    audienceSummaryParts.push("internal-only");
  }

  const permissionsSummary = `${roleLabelText} access for ${audienceSummaryParts.join(
    ", "
  )}.`;

  const controlsSummary = [
    allowReshare ? "resharing allowed" : "resharing limited",
    restrictDownload ? "downloads restricted" : "downloads allowed",
  ].join(" · ");

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Share / permissions preview
          </p>
          <p className="text-sm text-slate-200">
            See who can access this before you hit &quot;Share&quot;.
          </p>
        </div>
        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <Lock className="h-4 w-4" />
          <span>Preview-only · No changes applied</span>
        </div>
      </div>

      <PermissionsRiskBanner />

      {/* Visibility */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Visibility
        </p>
        <div className="flex flex-wrap gap-1.5">
          {VISIBILITY_OPTIONS.map((option) => {
            const active = option.id === visibility;
            return (
              <Button
                key={option.id}
                size="sm"
                variant={active ? "solid" : "outline"}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px]",
                  active &&
                    "bg-sky-500 text-slate-950 hover:bg-sky-400"
                )}
                onClick={() => setVisibility(option.id)}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Role */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Permission level
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ROLE_OPTIONS.map((option) => {
            const active = option.id === role;
            const Icon =
              option.id === "viewer"
                ? Eye
                : option.id === "commenter"
                ? Eye
                : option.id === "editor"
                ? EyeOff
                : Lock;
            return (
              <Button
                key={option.id}
                size="sm"
                variant={active ? "solid" : "outline"}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px]",
                  active &&
                    "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                )}
                onClick={() => setRole(option.id)}
              >
                <Icon className="mr-1.5 h-3 w-3" />
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      <PermissionsAudienceChips />

      {/* Summary */}
      <div className="rounded-2xl bg-slate-950/60 px-3 py-2 text-[11px] text-slate-200">
        <p className="font-semibold text-slate-100">
          If you share with this configuration:
        </p>
        <p className="mt-1 leading-relaxed text-slate-200">
          {permissionsSummary}
        </p>
        <p className="mt-1 text-slate-400">{controlsSummary}.</p>
      </div>
    </Card>
  );
}
