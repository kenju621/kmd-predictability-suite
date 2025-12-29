// src/app/permissions/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shell } from "../../components/layout/Shell";
import { TopNav } from "../../components/layout/TopNav";
import { PermissionsScenarioSwitcher } from "../../components/permissions/PermissionsScenarioSwitcher";
import { PermissionsPreviewPanel } from "../../components/permissions/PermissionsPreviewPanel";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function PermissionsPage() {
  useEffect(() => {
    document.title = "KMD Systems Lab · Permissions Preview Demo";
  }, []);

  const fadeInitial = { opacity: 0, y: 12 };
  const fadeAnimate = { opacity: 1, y: 0 };

  return (
    <Shell>
      <TopNav />
      <main
        id="main-content"
        className="flex flex-1 flex-col gap-8"
        aria-label="Permissions preview demo"
      >
        <motion.section
          className="space-y-6"
          initial={fadeInitial}
          animate={fadeAnimate}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            <Badge className="border-violet-500/40 bg-violet-500/10 text-[10px] text-violet-300">
              Permissions preview layer
            </Badge>
            <span>Prevent &quot;oops-I-shared-too-much&quot; moments.</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl xl:text-5xl">
              Predictable sharing with a{" "}
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                Permissions Preview Layer
              </span>
              .
            </h1>
            <p className="max-w-3xl text-sm text-slate-300 md:text-base">
              Before a user hits &quot;Share&quot;, this layer explains who will
              have access, how powerful that access is, and how far the content
              can travel. Instead of learning by mistake, they get a clear
              preview of the impact.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
          initial={fadeInitial}
          animate={fadeAnimate}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        >
          <div className="space-y-4">
            <PermissionsPreviewPanel />
          </div>

          <div className="space-y-4">
            <PermissionsScenarioSwitcher />
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Problem
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Sharing flows across modern products are powerful—but often
                opaque. Users guess at who will see what, and only learn the
                impact after a mistake. That erodes trust and generates
                avoidable support tickets.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Approach
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Treat permissions as a first-class, system-level concern. This
                preview layer sits above individual products, explains the
                outcome in human language, and highlights risk before the user
                commits.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Impact
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Fewer &quot;oops&quot; moments, less rework, and higher
                confidence sharing—especially for mixed internal/external
                collaboration. It&apos;s defect prevention for permissions, not
                just nicer error messages.
              </p>
            </Card>
          </div>
        </motion.section>
      </main>
    </Shell>
  );
}
