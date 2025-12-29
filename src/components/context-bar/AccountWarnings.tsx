// src/components/context-bar/AccountWarnings.tsx
"use client";

import {
  AlertTriangle,
  MonitorSmartphone,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useAccountStore } from "../../store/accountStore";
import { SCENARIOS, getScenarioById } from "../../lib/scenerios";

type WarningState = "aligned" | "identity-mismatch" | "device-mismatch" | "high-risk";

type BaseScenario = (typeof SCENARIOS)[number];

type ScenarioWithMeta = BaseScenario & {
  recommendedAccountKind?: "work" | "personal" | "guest";
  recommendedDeviceKind?: "desktop" | "mobile" | "tv";
};

export function AccountWarnings() {
  // Separate selectors so Zustand snapshots stay stable
  const currentAccountId = useAccountStore((s) => s.currentAccountId);
  const currentDeviceId = useAccountStore((s) => s.currentDeviceId);
  const currentScenarioId = useAccountStore((s) => s.currentScenarioId);

  const baseScenario = getScenarioById(currentScenarioId) ?? SCENARIOS[0];
  const scenario = baseScenario as ScenarioWithMeta;

  const expectedAccount = scenario.recommendedAccountKind;
  const expectedDevice = scenario.recommendedDeviceKind;

  const isWork = currentAccountId === "work";
  const isPersonal = currentAccountId === "personal";
  const isGuest = currentAccountId === "guest";

  const isTv = currentDeviceId === "tv";
  const isMobile = currentDeviceId === "mobile";
  const isDesktop = currentDeviceId === "desktop";

  const identityLabel = isWork
    ? "Work"
    : isPersonal
    ? "Personal"
    : isGuest
    ? "Guest"
    : "Current";

  const deviceLabel = isTv
    ? "TV"
    : isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : "Current device";

  // Work out which warnings apply based on scenario’s recommended identity/device
  const identityMismatch =
    expectedAccount !== undefined && currentAccountId !== expectedAccount;
  const deviceMismatch =
    expectedDevice !== undefined && currentDeviceId !== expectedDevice;

  let state: WarningState = "aligned";
  if (identityMismatch && deviceMismatch) {
    state = "high-risk";
  } else if (identityMismatch) {
    state = "identity-mismatch";
  } else if (deviceMismatch) {
    state = "device-mismatch";
  }

  // 🔴 High risk: both wrong (identity + device)
  if (state === "high-risk") {
    return (
      <div className="w-full rounded-xl border border-rose-500/80 bg-rose-500/15 px-3 py-2 text-[11px] text-rose-50">
        <div className="flex items-start gap-2">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-none" />
          <div className="space-y-0.5">
            <p className="font-medium">
              This setup doesn’t match the intended identity or device.
            </p>
            <p className="text-[10px] leading-snug text-rose-100/90">
              <span className="capitalize">{scenario.name}</span> was modeled
              for a specific identity and device. You&apos;re currently using{" "}
              <span className="font-semibold">{identityLabel}</span> on{" "}
              <span className="font-semibold">{deviceLabel}</span>. Switch both
              identity and device to see the &quot;safe&quot; version of this
              flow.
            </p>
            <p className="mt-0.5 text-[10px] text-rose-100/80">
              Recommended identity:{" "}
              <span className="font-semibold">
                {scenario.recommendedAccountKind ?? "Not specified"}
              </span>{" "}
              · Recommended device:{" "}
              <span className="font-semibold">
                {scenario.recommendedDeviceKind ?? "Not specified"}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🟡 Identity mismatch only
  if (state === "identity-mismatch") {
    return (
      <div className="w-full rounded-xl border border-amber-500/70 bg-amber-500/12 px-3 py-2 text-[11px] text-amber-50">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none" />
          <div className="space-y-0.5">
            <p className="font-medium">
              Identity may not match this scenario.
            </p>
            <p className="text-[10px] leading-snug text-amber-100/90">
              <span className="capitalize">{scenario.name}</span> is modeled
              around a specific account type. You&apos;re currently using your{" "}
              <span className="font-semibold">{identityLabel}</span> identity.
              Switch identities if this doesn&apos;t match the real-world flow
              (for example, Work vs Personal).
            </p>
            <p className="mt-0.5 text-[10px] text-amber-100/80">
              Recommended identity:{" "}
              <span className="font-semibold">
                {scenario.recommendedAccountKind ?? "Not specified"}
              </span>{" "}
              · Device:{" "}
              <span className="font-semibold">{deviceLabel}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🔵 Device mismatch only
  if (state === "device-mismatch") {
    return (
      <div className="w-full rounded-xl border border-sky-500/70 bg-sky-500/12 px-3 py-2 text-[11px] text-sky-50">
        <div className="flex items-start gap-2">
          <MonitorSmartphone className="mt-0.5 h-3.5 w-3.5 flex-none" />
          <div className="space-y-0.5">
            <p className="font-medium">Device may not match this scenario.</p>
            <p className="text-[10px] leading-snug text-sky-100/90">
              <span className="capitalize">{scenario.name}</span> is meant for a
              specific surface (for example, a shared TV profile). You&apos;re
              currently on{" "}
              <span className="font-semibold">{deviceLabel}</span>. Switch
              devices to see how the bar behaves in its intended context.
            </p>
            <p className="mt-0.5 text-[10px] text-sky-100/80">
              Identity:{" "}
              <span className="font-semibold">{identityLabel}</span> ·
              Recommended device:{" "}
              <span className="font-semibold">
                {scenario.recommendedDeviceKind ?? "Not specified"}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🟢 Aligned: recommended identity + device are both satisfied
  return (
    <div className="w-full rounded-xl border border-emerald-500/70 bg-emerald-500/12 px-3 py-2 text-[11px] text-emerald-50">
      <div className="flex items-start gap-2">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-none" />
        <div className="space-y-0.5">
          <p className="font-medium">Everything matches this scenario.</p>
          <p className="text-[10px] leading-snug text-emerald-100/90">
            You&apos;re using your{" "}
            <span className="font-semibold">{identityLabel}</span> identity on{" "}
            <span className="font-semibold">{deviceLabel}</span> for{" "}
            <span className="capitalize">{scenario.name}</span>. Use this as the
            &quot;ideal&quot; setup, then switch identities or devices to
            explore edge cases.
          </p>
          {(scenario.recommendedAccountKind || scenario.recommendedDeviceKind) && (
            <p className="mt-0.5 text-[10px] text-emerald-100/80">
              Recommended identity:{" "}
              <span className="font-semibold">
                {scenario.recommendedAccountKind ?? "Any"}
              </span>{" "}
              · Recommended device:{" "}
              <span className="font-semibold">
                {scenario.recommendedDeviceKind ?? "Any"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
