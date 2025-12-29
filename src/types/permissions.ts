// src/types/permissions.ts

export type VisibilityLevel = "private" | "team" | "org" | "link" | "public";

export type PermissionRole = "viewer" | "commenter" | "editor" | "owner";

export type RiskLevel = "low" | "medium" | "high";

export type PermissionsScenarioId =
  | "team-draft"
  | "vendor-collab"
  | "org-broadcast"
  | "public-help";

export interface PermissionsScenario {
  id: PermissionsScenarioId;
  name: string;
  summary: string;
  description: string;
  defaultVisibility: VisibilityLevel;
  defaultRole: PermissionRole;
  defaultIncludeExternal: boolean;
  defaultAllowReshare: boolean;
  defaultRestrictDownload: boolean;
}
