// src/lib/activity.ts

import {
  type ActivityEvent,
  type ActivityImpactLevel,
  type ActivityScenario,
  type ActivityScenarioId,
} from "../types/activity";

export const ACTIVITY_SCENARIOS: ActivityScenario[] = [
  {
    id: "ownership-change",
    name: "Ownership change",
    summary: "When the source of truth moves to a new owner.",
    description:
      "Use this view when work is handed off to a new owner or team, so people understand why their access changed and where to go next.",
    recommendedFocus: "clarity and continuity of ownership",
  },
  {
    id: "visibility-change",
    name: "Visibility change",
    summary: "When content becomes more public or more restricted.",
    description:
      "Use this view when visibility shifts significantly—like moving from team-only to org-wide or public—so reach feels deliberate, not accidental.",
    recommendedFocus: "audience, reach, and intent",
  },
  {
    id: "deleted-item",
    name: "Deleted or archived",
    summary: "When something disappears from its usual place.",
    description:
      "Use this view when a file, folder, or playlist is removed, to distinguish between cleanup, archival, and true deletion.",
    recommendedFocus: "reassurance and recoverability",
  },
  {
    id: "external-access",
    name: "External access added",
    summary: "When collaborators outside the org gain access.",
    description:
      "Use this view when agencies, vendors, or contractors are invited in, so internal teams understand the new collaboration boundary.",
    recommendedFocus: "clear external collaboration boundaries",
  },
];

export function getActivityScenarioById(
  id: ActivityScenarioId | null | undefined
): ActivityScenario {
  return ACTIVITY_SCENARIOS.find((s) => s.id === id) ?? ACTIVITY_SCENARIOS[0];
}

// Example events for each scenario
const BASE_EVENTS: ActivityEvent[] = [
  {
    id: "ownership-1",
    scenarioId: "ownership-change",
    timeAgo: "2 hours ago",
    surface: "Docs · Strategy deck",
    actor: "Alex (Product)",
    actorType: "user",
    summary: "Ownership moved from Personal → Work account",
    detail:
      "The strategy deck is now owned by your Work account instead of a personal one, so future sharing and retention follow your org policies.",
    impactLevel: "medium",
    isReversible: true,
    nextStepLabel: "View new owner",
  },
  {
    id: "ownership-2",
    scenarioId: "ownership-change",
    timeAgo: "3 hours ago",
    surface: "Drive · Q2 roadmap folder",
    actor: "System",
    actorType: "system",
    summary: "Folder ownership aligned to team workspace",
    detail:
      "To keep access predictable, this folder was moved into the Product team workspace. Your existing access level stays the same.",
    impactLevel: "low",
    isReversible: false,
  },
  {
    id: "visibility-1",
    scenarioId: "visibility-change",
    timeAgo: "Yesterday",
    surface: "Docs · Launch announcement",
    actor: "Maria (Marketing)",
    actorType: "user",
    summary: "Visibility changed from Team → Org-wide",
    detail:
      "This document is now visible to everyone in your organization. Comments are limited to editors to keep the message stable.",
    impactLevel: "medium",
    isReversible: true,
    nextStepLabel: "View visibility settings",
  },
  {
    id: "visibility-2",
    scenarioId: "visibility-change",
    timeAgo: "Last week",
    surface: "TV Profile · Shared profile",
    actor: "Family Hub",
    actorType: "integration",
    summary: "Profile sharing turned off for guests",
    detail:
      "Guest access to this shared TV profile was disabled to keep recommendations and watch history aligned to your household.",
    impactLevel: "low",
    isReversible: true,
    nextStepLabel: "Review profile settings",
  },
  {
    id: "deleted-1",
    scenarioId: "deleted-item",
    timeAgo: "4 hours ago",
    surface: "Drive · Archive folder",
    actor: "Cleanup Assistant",
    actorType: "integration",
    summary: "Folder moved to Archive workspace",
    detail:
      "Older assets were archived automatically based on your workspace rules. Nothing has been permanently deleted and can be restored.",
    impactLevel: "low",
    isReversible: true,
    nextStepLabel: "Open archive workspace",
  },
  {
    id: "deleted-2",
    scenarioId: "deleted-item",
    timeAgo: "2 days ago",
    surface: "Docs · Draft spec",
    actor: "Jordan (Eng)",
    actorType: "user",
    summary: "Draft moved to Trash",
    detail:
      "This draft was moved to Trash. It will be permanently deleted after your org’s retention window unless restored.",
    impactLevel: "medium",
    isReversible: true,
    nextStepLabel: "Restore from Trash",
  },
  {
    id: "external-1",
    scenarioId: "external-access",
    timeAgo: "3 hours ago",
    surface: "Docs · Agency brief",
    actor: "Priya (Brand)",
    actorType: "user",
    summary: "External agency given Viewer access",
    detail:
      "A partner agency can now view this brief. Edits and comments remain limited to your internal team.",
    impactLevel: "medium",
    isReversible: true,
    nextStepLabel: "Review external viewers",
  },
  {
    id: "external-2",
    scenarioId: "external-access",
    timeAgo: "Yesterday",
    surface: "Drive · Shared assets folder",
    actor: "Collab Bridge",
    actorType: "integration",
    summary: "Restricted link created for partner SSO",
    detail:
      "A sign-in-gated link was created for partners. Access is limited to invited organizations and can be revoked at any time.",
    impactLevel: "high",
    isReversible: true,
    nextStepLabel: "Manage partner access",
  },
];

export function getEventsForScenario(
  scenarioId: ActivityScenarioId
): ActivityEvent[] {
  return BASE_EVENTS.filter((e) => e.scenarioId === scenarioId);
}

export function computeScenarioImpact(
  events: ActivityEvent[]
): ActivityImpactLevel {
  if (events.some((e) => e.impactLevel === "high")) return "high";
  if (events.some((e) => e.impactLevel === "medium")) return "medium";
  return "low";
}
