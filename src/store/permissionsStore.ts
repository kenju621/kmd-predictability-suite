// src/store/permissionsStore.ts

import { create } from "zustand";
import {
  type PermissionRole,
  type PermissionsScenarioId,
  type VisibilityLevel,
} from "../types/permissions";
import { getScenarioById } from "../lib/permissions";

type PermissionsState = {
  currentScenarioId: PermissionsScenarioId;
  visibility: VisibilityLevel;
  role: PermissionRole;
  includeExternal: boolean;
  allowReshare: boolean;
  restrictDownload: boolean;

  setVisibility: (visibility: VisibilityLevel) => void;
  setRole: (role: PermissionRole) => void;
  setIncludeExternal: (value: boolean) => void;
  setAllowReshare: (value: boolean) => void;
  setRestrictDownload: (value: boolean) => void;
  applyScenario: (id: PermissionsScenarioId) => void;
};

export const usePermissionsStore = create<PermissionsState>((set) => ({
  currentScenarioId: "team-draft",
  visibility: "team",
  role: "editor",
  includeExternal: false,
  allowReshare: false,
  restrictDownload: true,

  setVisibility: (visibility) => set({ visibility }),
  setRole: (role) => set({ role }),
  setIncludeExternal: (value) => set({ includeExternal: value }),
  setAllowReshare: (value) => set({ allowReshare: value }),
  setRestrictDownload: (value) => set({ restrictDownload: value }),

  applyScenario: (id) =>
    set(() => {
      const scenario = getScenarioById(id);
      return {
        currentScenarioId: scenario.id,
        visibility: scenario.defaultVisibility,
        role: scenario.defaultRole,
        includeExternal: scenario.defaultIncludeExternal,
        allowReshare: scenario.defaultAllowReshare,
        restrictDownload: scenario.defaultRestrictDownload,
      };
    }),
}));
