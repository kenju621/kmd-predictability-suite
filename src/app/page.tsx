// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shell } from "../components/layout/Shell";
import { TopNav } from "../components/layout/TopNav";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function HomePage() {
  // Per-page title for browser tab
  useEffect(() => {
    document.title = "KMD Systems Lab · Core Experience Prototypes";
  }, []);

  const fadeInitial = { opacity: 0, y: 12 };
  const fadeAnimate = { opacity: 1, y: 0 };

  return (
    <Shell>
      <TopNav />
      <main
        id="main-content"
        className="flex flex-1 flex-col gap-10"
        aria-label="KMD Systems Lab overview"
      >
        {/* Hero */}
        <motion.section
          className="space-y-6"
          initial={fadeInitial}
          animate={fadeAnimate}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            <Badge className="border-sky-400/50 bg-sky-500/10 text-[10px] text-sky-200">
              Core experience prototype
            </Badge>
            <span>System-level UX for identity and permissions.</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl xl:text-5xl">
              Reducing account and sharing friction with{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300 bg-clip-text text-transparent">
                universal context
              </span>
              .
            </h1>
            <p className="max-w-3xl text-sm text-slate-300 md:text-base">
              This space explores how a small, consistent system layer can
              prevent common &quot;oops&quot; moments across complex products –
              choosing the wrong account, sharing with the wrong audience, or
              losing track of where work lives across devices.
            </p>
          </div>
        </motion.section>

        {/* Case study cards */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Left column: overview */}
          <motion.div
            initial={fadeInitial}
            animate={fadeAnimate}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          >
            <Card className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Two connected prototypes
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Designed and built as interactive case studies for system-level
                  UX and continuous improvement work.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-200">
                <div className="rounded-2xl bg-slate-950/60 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    01 · Universal Account Context Bar
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    A shared bar that runs across product surfaces to keep
                    identity, device context, and ownership predictable. It
                    reduces &quot;I did that from the wrong account&quot; moments
                    before they reach support.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950/60 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    02 · Permissions Preview Layer
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    A lightweight layer that explains who will have access and how
                    powerful that access is before a user hits &quot;Share&quot;.
                    It&apos;s designed to prevent oversharing defects, not just
                    respond to them.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right column: scenarios */}
          <motion.div
            className="space-y-4"
            initial={fadeInitial}
            animate={fadeAnimate}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            {/* Support ticket scenario */}
            <Card className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Support ticket · Identity
                </p>
                <Badge className="border-amber-400/50 bg-amber-500/15 text-[10px] text-amber-50">
                  Preventable
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-slate-200">
                <p className="font-medium text-slate-50">
                  &quot;I shared the file from my personal account by accident.&quot;
                </p>
                <p className="text-xs text-slate-300">
                  The context bar surfaces the active identity and device before
                  the share happens, nudging the user into the right account while
                  it&apos;s still easy to correct.
                </p>
              </div>
            </Card>

            {/* Sharing / permissions scenario */}
            <Card className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Support ticket · Sharing
                </p>
                <Badge className="border-rose-400/60 bg-rose-500/15 text-[10px] text-rose-50">
                  High reach
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-slate-200">
                <p className="font-medium text-slate-50">
                  &quot;This doc was public when it should have been internal.&quot;
                </p>
                <p className="text-xs text-slate-300">
                  The permissions preview layer explains the audience, role, and
                  potential reach in plain language, so high-impact configurations
                  are deliberate, not accidental.
                </p>
              </div>
            </Card>

            {/* Link hints */}
            <Card className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Explore the prototypes
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>
                  <span className="font-semibold text-slate-100">
                    Identity demo:
                  </span>{" "}
                  Navigate to <span className="text-sky-300">/demo</span> to
                  explore the Universal Account Context Bar.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Permissions demo:
                  </span>{" "}
                  Navigate to{" "}
                  <span className="text-emerald-300">/permissions</span> to try
                  the Permissions Preview Layer.
                </li>
              </ul>
            </Card>
          </motion.div>
        </section>

        {/* Why this matters */}
        <motion.section
          className="space-y-4"
          initial={fadeInitial}
          animate={fadeAnimate}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        >
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            Why this work matters
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            <Card className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Fewer preventable tickets
              </p>
              <p className="text-sm text-slate-200">
                By catching identity and permissions misconfigurations before they
                ship, these patterns reduce rework and support load.
              </p>
            </Card>
            <Card className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Stronger user trust
              </p>
              <p className="text-sm text-slate-200">
                Clear, predictable behavior around &quot;who can see what&quot;
                helps users feel confident taking action in powerful tools.
              </p>
            </Card>
            <Card className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Cross-surface predictability
              </p>
              <p className="text-sm text-slate-200">
                The same patterns apply across web, mobile, and TV, giving users a
                consistent mental model no matter where they start.
              </p>
            </Card>
          </div>
        </motion.section>
      </main>
    </Shell>
  );
}
