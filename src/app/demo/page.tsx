// src/app/demo/page.tsx
"use client";

import { Shell } from "../../components/layout/Shell";
import { TopNav } from "../../components/layout/TopNav";
import { AccountContextBar } from "../../components/context-bar/AccountContextBar";
import { Card } from "../../components/ui/card";
import { useAccountStore } from "../../store/accountStore";
import {
  SCENARIOS,
  getScenarioById,
  type ScenarioId,
} from "../../lib/scenerios";
import { cn } from "../../lib/utils";

export default function DemoPage() {
  return (
    <Shell>
      <TopNav />
      <main
        id="main-content"
        className="flex flex-1 flex-col gap-8"
        aria-label="Identity context demo"
      >
        {/* Hero */}
        <section className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl xl:text-4xl">
            Universal Account Context Bar
          </h1>
          <p className="max-w-3xl text-sm text-slate-300 md:text-base">
            Switch identities, devices, and scenarios to see how a shared system
            bar can reduce wrong-account actions, surface external ownership,
            and make cross-surface work feel predictable.
          </p>
        </section>

        {/* Bar + playground */}
        <section className="space-y-4">
          <AccountContextBar />

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            {/* Simulated product surface */}
            <Card className="aspect-[16/9] overflow-hidden border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950/90 p-4">
              <div className="flex h-full flex-col">
                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Simulated product surface
                  </p>
                  <p className="text-xs text-slate-300 md:text-sm">
                    Imagine this bar mounted consistently across docs, calendar,
                    and media surfaces—web, mobile, and TV—owned by a Core
                    Experience-style team.
                  </p>
                </div>

                <div className="flex flex-1 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 text-center text-xs text-slate-400">
                  <span className="max-w-xs leading-relaxed">
                    This area represents the underlying app (Docs, Calendar,
                    Drive, YouTube TV, etc.). The bar runs above it as a shared
                    system of record for identity and context.
                  </span>
                </div>
              </div>
            </Card>

            {/* Right-hand stack: how-to + scenario playground */}
            <div className="space-y-4">
              {/* Explanation card */}
              <Card className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  How to use this demo
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li>
                    <span className="font-semibold text-slate-100">
                      Choose a scenario:
                    </span>{" "}
                    Use the scenario playground to simulate flows like personal
                    vs work, external ownership, or shared devices.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-100">
                      Switch identities:
                    </span>{" "}
                    See how the bar reacts as you move between Personal, Work,
                    and Guest accounts.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-100">
                      Change devices:
                    </span>{" "}
                    Explore how device context (desktop, mobile, TV) affects
                    what the bar surfaces and when it stays quiet.
                  </li>
                </ul>
              </Card>

              {/* Scenario playground card (with buttons) */}
              <ScenarioPlaygroundCard />
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

/**
 * Scenario playground: lets you pick a scenario, and updates the store.
 * The bar + warnings react to currentScenarioId.
 */
function ScenarioPlaygroundCard() {
  const currentScenarioId = useAccountStore((s) => s.currentScenarioId);
  const scenario = getScenarioById(currentScenarioId) ?? SCENARIOS[0];

  const handleSelect = (id: ScenarioId) => {
    useAccountStore.setState({ currentScenarioId: id });
  };

  return (
    <Card className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        Scenario · Playground
      </p>
      <p className="text-xs text-slate-300">
        Choose a scenario to simulate a real-world context for identity and
        account behavior. The bar and warnings update based on your choice.
      </p>

      <div className="flex flex-wrap gap-1.5">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleSelect(s.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              s.id === currentScenarioId
                ? "border-sky-400 bg-sky-500 text-slate-950 hover:bg-sky-400"
                : "border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-500 hover:bg-slate-900"
            )}
            aria-pressed={s.id === currentScenarioId}
            aria-label={`Use scenario: ${s.name}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {scenario?.description && (
        <p className="text-xs leading-relaxed text-slate-300">
          {scenario.description}
        </p>
      )}

      <p className="mt-1 text-[11px] text-slate-500">
        This card drives the current scenario. Try switching identities and
        devices after changing scenarios to see how the bar responds.
      </p>
    </Card>
  );
}
