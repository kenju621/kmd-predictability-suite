// src/components/activity/ActivityTimelinePanel.tsx
"use client";

import React from "react";
import { Clock, ShieldAlert, Undo2, User, Workflow } from "lucide-react";
import { useActivityStore } from "../../store/activityStore";
import { computeScenarioImpact } from "../../lib/activity";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function ActivityTimelinePanel() {
  const events = useActivityStore((s) => s.events);
  const impact = computeScenarioImpact(events);

  let bannerColor =
    "border-emerald-400/70 bg-emerald-500/15 text-emerald-50";
  let bannerTitle = "Calm, traceable changes";
  let bannerDetail =
    "Recent changes are low impact and clearly reversible. The timeline keeps people oriented without adding noise.";
  let Icon: React.ElementType = Workflow;

  if (impact === "medium") {
    bannerColor = "border-amber-400/70 bg-amber-500/18 text-amber-50";
    bannerTitle = "Meaningful changes with clear context";
    bannerDetail =
      "These updates affect who can see or own content. The timeline explains why, and where to go if something feels unexpected.";
    Icon = ShieldAlert;
  }

  if (impact === "high") {
    bannerColor = "border-rose-400/80 bg-rose-500/20 text-rose-50";
    bannerTitle = "High-impact changes, explained";
    bannerDetail =
      "Some changes in this set can affect a wide audience or external access. The timeline surfaces them calmly with next steps.";
    Icon = ShieldAlert;
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Activity timeline
          </p>
          <p className="text-sm text-slate-200">
            A privacy-safe summary of recent changes to identity, sharing, and ownership.
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Most recent first</span>
        </div>
      </div>

      <div
        className={cn(
          "flex items-start gap-2 rounded-2xl border px-3 py-2 text-xs",
          bannerColor
        )}
      >
        <Icon className="mt-0.5 h-4 w-4 flex-none" />
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-1">
            <span className="font-semibold">{bannerTitle}</span>
            <Badge className="border-current/40 bg-white/10 text-[9px] text-current">
              Activity layer
            </Badge>
          </div>
          <p className="text-[11px] leading-snug opacity-95">
            {bannerDetail}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={cn(
              "flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3",
              index === 0 && "border-sky-500/40"
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <TimelineDot impact={event.impactLevel} />
              {index < events.length - 1 && (
                <div className="h-full w-px flex-1 bg-slate-800" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {event.surface}
                  </p>
                  <p className="text-sm font-medium text-slate-50">
                    {event.summary}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="text-[11px] text-slate-400">
                    {event.timeAgo}
                  </span>
                  <ActorPill actor={event.actor} actorType={event.actorType} />
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {event.detail}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                <ImpactBadge level={event.impactLevel} />
                {event.isReversible && event.nextStepLabel && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-100 hover:bg-slate-900"
                    aria-label={event.nextStepLabel}
                  >
                    <Undo2 className="mr-1.5 h-3 w-3" />
                    {event.nextStepLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TimelineDot({ impact }: { impact: ActivityImpactLevel }) {
  let color = "bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]";
  if (impact === "medium") {
    color = "bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.25)]";
  }
  if (impact === "high") {
    color = "bg-rose-400 shadow-[0_0_0_4px_rgba(244,63,94,0.35)]";
  }
  return (
    <div
      className={cn(
        "mt-1 h-2.5 w-2.5 rounded-full border border-slate-950",
        color
      )}
    />
  );
}

type ActivityImpactLevel = "low" | "medium" | "high";

function ImpactBadge({ level }: { level: ActivityImpactLevel }) {
  if (level === "low") {
    return (
      <Badge className="border-emerald-400/60 bg-emerald-500/15 text-[10px] text-emerald-100">
        Low impact · fully traceable
      </Badge>
    );
  }
  if (level === "medium") {
    return (
      <Badge className="border-amber-400/60 bg-amber-500/15 text-[10px] text-amber-100">
        Medium impact · worth a quick review
      </Badge>
    );
  }
  return (
    <Badge className="border-rose-400/70 bg-rose-500/20 text-[10px] text-rose-50">
      High potential reach · clearly explained
    </Badge>
  );
}

function ActorPill({
  actor,
  actorType,
}: {
  actor: string;
  actorType: "user" | "system" | "integration";
}) {
  let labelPrefix = "Changed by";
  if (actorType === "system") labelPrefix = "System update";
  if (actorType === "integration") labelPrefix = "Integration";

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-200">
      <User className="h-3 w-3 text-slate-400" />
      <span className="opacity-70">{labelPrefix}:</span>
      <span className="font-medium text-slate-100">{actor}</span>
    </div>
  );
}
