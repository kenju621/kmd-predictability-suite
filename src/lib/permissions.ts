// src/lib/permissions.ts

import {
  type PermissionRole,
  type PermissionsScenario,
  type PermissionsScenarioId,
  type RiskLevel,
  type VisibilityLevel,
} from "../types/permissions";

export const VISIBILITY_OPTIONS: {
  id: VisibilityLevel;
  label: string;
  description: string;
}[] = [
  {
    id: "private",
    label: "Private",
    description: "Only you can access this item.",
  },
  {
    id: "team",
    label: "Team",
    description: "Visible to a specific team or project group.",
  },
  {
    id: "org",
    label: "Org-wide",
    description: "Everyone in your organization can see it.",
  },
  {
    id: "link",
    label: "Anyone with link",
    description: "Anyone with the link can access, even if not in your org.",
  },
  {
    id: "public",
    label: "Public on the web",
    description: "Discoverable and visible to anyone on the internet.",
  },
];

export const ROLE_OPTIONS: {
  id: PermissionRole;
  label: string;
  description: string;
}[] = [
  {
    id: "viewer",
    label: "Viewer",
    description: "Can view only. No comments or edits.",
  },
  {
    id: "commenter",
    label: "Commenter",
    description: "Can leave comments but not change content.",
  },
  {
    id: "editor",
    label: "Editor",
    description: "Can change content and potentially share further.",
  },
  {
    id: "owner",
    label: "Owner",
    description: "Full control over visibility and ownership.",
  },
];

export const SCENARIOS: PermissionsScenario[] = [
  {
    id: "team-draft",
    name: "Team draft",
    summary: "Early work-in-progress shared with a small internal group.",
    description:
      "Use this pattern when you’re exploring ideas with a trusted team but don’t want the work discoverable across the entire org yet.",
    defaultVisibility: "team",
    defaultRole: "editor",
    defaultIncludeExternal: false,
    defaultAllowReshare: false,
    defaultRestrictDownload: true,
  },
  {
    id: "vendor-collab",
    name: "Vendor collaboration",
    summary: "Internal + external collaborators working in the same space.",
    description:
      "Use this pattern when you’re co-authoring with agencies, contractors, or vendors and you want to keep control of distribution.",
    defaultVisibility: "link",
    defaultRole: "editor",
    defaultIncludeExternal: true,
    defaultAllowReshare: false,
    defaultRestrictDownload: true,
  },
  {
    id: "org-broadcast",
    name: "Org-wide broadcast",
    summary: "Announcement or reference content for everyone in the org.",
    description:
      "Use this pattern when you want high visibility inside your organization but do not want the content accessible externally.",
    defaultVisibility: "org",
    defaultRole: "viewer",
    defaultIncludeExternal: false,
    defaultAllowReshare: true,
    defaultRestrictDownload: false,
  },
  {
    id: "public-help",
    name: "Public help center",
    summary: "Knowledge base content you intend to be public and stable.",
    description:
      "Use this pattern when you’re publishing docs or FAQs that are safe to share publicly and intended for a broad audience.",
    defaultVisibility: "public",
    defaultRole: "viewer",
    defaultIncludeExternal: true,
    defaultAllowReshare: true,
    defaultRestrictDownload: false,
  },
];

export function getScenarioById(
  id: PermissionsScenarioId | null | undefined
): PermissionsScenario {
  return SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
}

export function computeRiskLevel(params: {
  visibility: VisibilityLevel;
  role: PermissionRole;
  includeExternal: boolean;
  allowReshare: boolean;
}): RiskLevel {
  const { visibility, role, includeExternal, allowReshare } = params;

  // Base score from visibility
  let score = 0;
  switch (visibility) {
    case "private":
      score += 1;
      break;
    case "team":
      score += 1.4;
      break;
    case "org":
      score += 1.8;
      break;
    case "link":
      score += 2.3;
      break;
    case "public":
      score += 3;
      break;
  }

  // Add risk from role
  switch (role) {
    case "viewer":
      score += 0;
      break;
    case "commenter":
      score += 0.3;
      break;
    case "editor":
      score += 0.7;
      break;
    case "owner":
      score += 1;
      break;
  }

  // External + reshare increase risk
  if (includeExternal) {
    score += 0.5;
  }

  if (allowReshare) {
    score += 0.4;
  }

  if (score <= 1.8) return "low";
  if (score <= 3) return "medium";
  return "high";
}

export function visibilityLabel(id: VisibilityLevel): string {
  return VISIBILITY_OPTIONS.find((v) => v.id === id)?.label ?? id;
}

export function roleLabel(id: PermissionRole): string {
  return ROLE_OPTIONS.find((r) => r.id === id)?.label ?? id;
}
