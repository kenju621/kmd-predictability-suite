import type { Account } from "../types/account";

export const ACCOUNTS: Account[] = [
  {
    id: "personal",
    kind: "personal",
    label: "Personal",
    email: "you.personal@example.com",
    avatarSrc: "/avatars/personal.svg",
    accentColor: "#FF218C",
  },
  {
    id: "work",
    kind: "work",
    label: "Work",
    email: "you@company.com",
    avatarSrc: "/avatars/work.svg",
    accentColor: "#21B1FF",
  },
  {
    id: "guest",
    kind: "guest",
    label: "Guest",
    email: "guest.user@example.com",
    avatarSrc: "/avatars/guest.svg",
    accentColor: "#A855F7",
  },
];

export function getAccountById(id: string | null | undefined): Account {
  return ACCOUNTS.find((a) => a.id === id) ?? ACCOUNTS[1]; // default to work
}
