export type AccountKind = "personal" | "work" | "guest";

export type PermissionContext = "owner" | "editor" | "viewer" | "restricted";

export interface Account {
  id: string;
  kind: AccountKind;
  label: string;
  email: string;
  avatarSrc: string;
  accentColor: string; // e.g. hex string
}
