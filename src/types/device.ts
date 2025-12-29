export type DeviceKind = "desktop" | "mobile" | "tv";

export interface Device {
  id: string;
  kind: DeviceKind;
  label: string;
  iconSrc: string; // path under /public/devices
}
