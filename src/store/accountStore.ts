import { create } from "zustand";
import { ACCOUNTS, getAccountById } from "../lib/accounts";
import { DEVICES, getDeviceById } from "../lib/devices";
import { SCENARIOS, type ScenarioId, getScenarioById } from "../lib/scenerios";

type AccountState = {
  accounts: typeof ACCOUNTS;
  devices: typeof DEVICES;
  scenarios: typeof SCENARIOS;

  currentAccountId: string;
  currentDeviceId: string;
  currentScenarioId: ScenarioId;

  setCurrentAccount: (id: string) => void;
  setCurrentDevice: (id: string) => void;
  setCurrentScenario: (id: ScenarioId) => void;
};

export const useAccountStore = create<AccountState>((set) => ({
  accounts: ACCOUNTS,
  devices: DEVICES,
  scenarios: SCENARIOS,

  currentAccountId: "work",
  currentDeviceId: "desktop",
  currentScenarioId: "default-doc",

  setCurrentAccount: (id) => set({ currentAccountId: id }),
  setCurrentDevice: (id) => set({ currentDeviceId: id }),
  setCurrentScenario: (id) => set({ currentScenarioId: id }),
}));

// Selectors for convenience
export function useCurrentAccount() {
  const currentAccountId = useAccountStore((s) => s.currentAccountId);
  return getAccountById(currentAccountId);
}

export function useCurrentDevice() {
  const currentDeviceId = useAccountStore((s) => s.currentDeviceId);
  return getDeviceById(currentDeviceId);
}

export function useCurrentScenario() {
  const currentScenarioId = useAccountStore((s) => s.currentScenarioId);
  return getScenarioById(currentScenarioId);
}
