"use client";

import { useCurrentScenario } from "../context-bar/AccountContextProvider";
import { Card } from "../ui/card";

export function TimelineEventList() {
  const scenario = useCurrentScenario();

  return (
    <Card className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Flow with & without the bar
        </p>
        <p className="text-sm text-slate-200">
          How the context bar intervenes before friction happens.
        </p>
      </div>
      <ol className="space-y-2 text-xs text-slate-200">
        {scenario.timeline.map((step, index) => (
          <li key={index} className="flex gap-2">
            <span className="mt-[2px] flex h-4 w-4 flex-none items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-200">
              {index + 1}
            </span>
            <span className="leading-snug">{step}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
