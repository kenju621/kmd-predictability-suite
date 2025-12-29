// src/store/activityStore.ts

import { create } from "zustand";
import {
  type ActivityEvent,
  type ActivityScenarioId,
} from "../types/activity";
import {
  getActivityScenarioById,
  getEventsForScenario,
} from "../lib/activity";

type ActivityState = {
  currentScenarioId: ActivityScenarioId;
  events: ActivityEvent[];

  setScenario: (id: ActivityScenarioId) => void;
};

export const useActivityStore = create<ActivityState>((set) => ({
  currentScenarioId: "ownership-change",
  events: getEventsForScenario("ownership-change"),

  setScenario: (id) =>
    set(() => ({
      currentScenarioId: id,
      events: getEventsForScenario(id),
    })),
}));

export const useCurrentActivityScenario = () => {
  const scenarioId = useActivityStore((s) => s.currentScenarioId);
  return getActivityScenarioById(scenarioId);
};
