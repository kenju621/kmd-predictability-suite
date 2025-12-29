import type { Device } from "../types/device";

export const DEVICES: Device[] = [
  {
    id: "desktop",
    kind: "desktop",
    label: "Laptop / Desktop",
    iconSrc: "/devices/laptop.svg",
  },
  {
    id: "mobile",
    kind: "mobile",
    label: "Phone",
    iconSrc: "/devices/mobile.svg",
  },
  {
    id: "tv",
    kind: "tv",
    label: "TV",
    iconSrc: "/devices/tv.svg",
  },
];

export function getDeviceById(id: string | null | undefined): Device {
  return DEVICES.find((d) => d.id === id) ?? DEVICES[0];
}
