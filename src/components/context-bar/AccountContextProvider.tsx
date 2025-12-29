"use client";

import type { ReactNode } from "react";

/**
 * Right now this is just a semantic wrapper.
 * If you ever want to add React Context on top of Zustand,
 * this is where it would go.
 */
export function AccountContextProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Re-export core hooks so imports stay tidy.
export {
  useAccountStore,
  useCurrentAccount,
  useCurrentDevice,
  useCurrentScenario,
} from "../../store/accountStore";
