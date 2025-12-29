// src/app/activity/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shell } from "../../components/layout/Shell";
import { TopNav } from "../../components/layout/TopNav";
import { ActivityTimelinePanel } from "../../components/activity/ActivityTimelinePanel";
import { ActivityScenarioSwitcher } from "../../components/activity/ActivityScenarioSwitcher";
import { Card } from "../../components/ui/card";

export default function ActivityPage() {
  useEffect(() => {
    document.title = "KMD Systems Lab · Activity Timeline Demo";
  }, []);

  const fadeInitial = { opacity: 0, y: 12 };
  const fadeAnimate = { opacity: 1, y: 0 };

  return (
    <Shell>
      <TopNav />
      <main
        id="main-content"
        className="flex flex-1 flex-col gap-8"
        aria-label="Activity timeline demo"
      >
        <motion.section
          className="space-y-6"
          initial={fadeInitial}
          animate={fadeAnimate}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Activity · Timeline · Accountability
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl xl:text-5xl">
              Calm, privacy-safe explanations of{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300 bg-clip-text text-transparent">
                what just changed
              </span>
              .
            </h1>
          </div>
          <p className="max-w-3xl text-sm text-slate-300 md:text-base">
            This prototype imagines an activity layer that closes the loop:
            after identity and sharing decisions are made, people can still
            understand what happened, why it happened, and what to do next—
            without digging through multiple products or support threads.
          </p>
        </motion.section>

        <motion.section
          className="grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
          initial={fadeInitial}
          animate={fadeAnimate}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        >
          <div className="space-y-4">
            <ActivityTimelinePanel />
          </div>

          <div className="space-y-4">
            <ActivityScenarioSwitcher />
            <Card className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                What this layer does
              </p>
              <p className="text-sm text-slate-200">
                Instead of asking users to infer what changed from error
                messages or missing content, the activity layer provides a calm,
                privacy-safe explanation of recent changes across ownership,
                visibility, and external access.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                How it fits with the others
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>
                  <span className="font-semibold text-slate-100">
                    Identity bar:
                  </span>{" "}
                  &quot;Who am I right now?&quot;
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Permissions preview:
                  </span>{" "}
                  &quot;Who will see this?&quot;
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Activity timeline:
                  </span>{" "}
                  &quot;What just changed, and why?&quot;
                </li>
              </ul>
            </Card>
          </div>
        </motion.section>
      </main>
    </Shell>
  );
}
