import type { AccountKind } from "../types/account";
import type { DeviceKind } from "../types/device";

export type ScenarioId =
  | "default-doc"
  | "wrong-account"
  | "external-doc"
  | "restricted-calendar";

export interface Scenario {
  id: ScenarioId;
  name: string;
  summary: string;
  description: string;
  recommendedAccountKind?: AccountKind;
  recommendedDeviceKind?: DeviceKind;
  timeline: string[];
  riskFlags?: {
    wrongAccount?: boolean;
    restricted?: boolean;
    externalOwnership?: boolean;
  };
}

export const SCENARIOS: Scenario[] = [
  {
    id: "default-doc",
    name: "Standard doc in the right account",
    summary: "Everything matches: account, permissions, and device.",
    description:
      "You’re editing a document in your work account on your main laptop. Ownership and permissions are aligned with your identity.",
    recommendedAccountKind: "work",
    recommendedDeviceKind: "desktop",
    timeline: [
      "Open document link from email.",
      "Context bar confirms Work account + ownership.",
      "You edit confidently—no surprises later.",
    ],
    riskFlags: {},
  },
  {
    id: "wrong-account",
    name: "Wrong account for this doc",
    summary: "Classic mistake: link opened under the wrong identity.",
    description:
      "You click a Drive link from your manager but your browser is currently using your personal account.",
    recommendedAccountKind: "work",
    recommendedDeviceKind: "desktop",
    timeline: [
      "Click shared document link.",
      "Context bar warns: link is for Work, but you’re in Personal.",
      "You intentionally switch to Work to continue.",
    ],
    riskFlags: { wrongAccount: true },
  },
  {
    id: "external-doc",
    name: "External document ownership",
    summary: "You’re editing a file that’s owned by someone outside your org.",
    description:
      "You’re in your work account, but the document belongs to a vendor account. That affects how safe it is to store certain information.",
    recommendedAccountKind: "work",
    recommendedDeviceKind: "desktop",
    timeline: [
      "Open vendor-provided document.",
      "Context bar highlights external ownership.",
      "You decide what content is safe to add.",
    ],
    riskFlags: { externalOwnership: true },
  },
  {
    id: "restricted-calendar",
    name: "Restricted calendar context",
    summary: "You’re checking a restricted calendar on TV or mobile.",
    description:
      "You’re viewing a private team calendar, but the device is shared (like a TV in a conference room).",
    recommendedAccountKind: "work",
    recommendedDeviceKind: "tv",
    timeline: [
      "Open team calendar on a shared screen.",
      "Context bar flags restricted data on shared device.",
      "You choose a privacy-preserving view.",
    ],
    riskFlags: { restricted: true },
  },
];

export function getScenarioById(id: ScenarioId | null | undefined): Scenario {
  return SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
}
