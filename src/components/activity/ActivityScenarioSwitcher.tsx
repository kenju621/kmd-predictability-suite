// src/components/activity/ActivityScenarioSwitcher.tsx
"use client";

import React from "react";
import { useActivityStore, useCurrentActivityScenario } from "../../store/activityStore";
import { ACTIVITY_SCENARIOS } from "../../lib/activity";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function ActivityScenarioSwitcher() {
  const currentScenarioId = useActivityStore((s) => s.currentScenarioId);
  const setScenario = useActivityStore((s) => s.setScenario);
  const currentScenario = useCurrentActivityScenario();

  return (
    <Card className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Scenario timeline
        </p>
        <p className="mt-1 text-sm text-slate-200">
          Choose a scenario to see how the activity layer explains what changed.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {ACTIVITY_SCENARIOS.map((scenario) => {
          const active = scenario.id === currentScenarioId;
          return (
            <Button
              key={scenario.id}
              size="sm"
              variant={active ? "solid" : "outline"}
              className={cn(
                "rounded-full px-3 py-1 text-[11px]",
                active && "bg-sky-500 text-slate-950 hover:bg-sky-400"
              )}
              onClick={() => setScenario(scenario.id)}
            >
              {scenario.name}
            </Button>
          );
        })}
      </div>
      <p className="text-xs leading-relaxed text-slate-300">
        {currentScenario.description}
      </p>
      <p className="text-[11px] text-slate-400">
        Focus:{" "}
        <span className="text-slate-200">
          {currentScenario.recommendedFocus}
        </span>
      </p>
    </Card>
  );
}
