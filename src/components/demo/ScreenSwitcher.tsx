"use client";

import { useAccountStore, useCurrentScenario } from "../context-bar/AccountContextProvider";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";

export function ScreenSwitcher() {
  const scenarios = useAccountStore((s) => s.scenarios);
  const setCurrentScenario = useAccountStore((s) => s.setCurrentScenario);
  const currentScenario = useCurrentScenario();

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Scenario playground
          </p>
          <p className="text-sm text-slate-200">
            Switch between real-world identity problems.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {scenarios.map((scenario) => {
          const active = scenario.id === currentScenario.id;
          return (
            <Button
              key={scenario.id}
              variant={active ? "solid" : "outline"}
              size="sm"
              onClick={() => setCurrentScenario(scenario.id)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px]",
                active && "bg-sky-500 text-slate-950 hover:bg-sky-400"
              )}
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
