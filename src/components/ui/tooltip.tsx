"use client";

import type { ReactNode } from "react";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  // Lightweight: just use the `title` attribute for now.
  return (
    <span title={label} className="inline-flex items-center">
      {children}
    </span>
  );
}
