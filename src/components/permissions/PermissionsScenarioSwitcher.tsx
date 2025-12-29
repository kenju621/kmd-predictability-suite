// src/components/permissions/PermissionsScenarioSwitcher.tsx
"use client";

import React from "react";
import { usePermissionsStore } from "../../store/permissionsStore";
import { SCENARIOS } from "../../lib/permissions";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";

export function PermissionsScenarioSwitcher() {
  const currentScenarioId = usePermissionsStore(
    (s) => s.currentScenarioId
  );
  const applyScenario = usePermissionsStore((s) => s.applyScenario);

  const currentScenario =
    SCENARIOS.find((s) => s.id === currentScenarioId) ?? SCENARIOS[0];

  return (
    <Card className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Scenario playground
        </p>
        <p className="text-sm text-slate-200">
          Switch between common sharing patterns.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((scenario) => {
          const active = scenario.id === currentScenarioId;
          return (
            <Button
              key={scenario.id}
              size="sm"
              variant={active ? "solid" : "outline"}
              className={cn(
                "rounded-full px-3 py-1 text-[11px]",
                active && "bg-violet-500 text-slate-950 hover:bg-violet-400"
              )}
              onClick={() => applyScenario(scenario.id)}
            >
              {scenario.name}
            </Button>
          );
        })}
      </div>
      <p className="text-xs leading-relaxed text-slate-300">
        {currentScenario.description}
      </p>
    </Card>
  );
}
