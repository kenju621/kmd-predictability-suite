// src/types/activity.ts

export type ActivityScenarioId =
  | "ownership-change"
  | "visibility-change"
  | "deleted-item"
  | "external-access";

export type ActivityImpactLevel = "low" | "medium" | "high";

export type ActivityActorType = "user" | "system" | "integration";

export interface ActivityScenario {
  id: ActivityScenarioId;
  name: string;
  summary: string;
  description: string;
  recommendedFocus: string;
}

export interface ActivityEvent {
  id: string;
  scenarioId: ActivityScenarioId;
  timeAgo: string;
  surface: string; // e.g. "Docs", "Drive", "TV Profile"
  actor: string;
  actorType: ActivityActorType;
  summary: string;
  detail: string;
  impactLevel: ActivityImpactLevel;
  isReversible: boolean;
  nextStepLabel?: string;
}
