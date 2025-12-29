// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KMD Systems Lab · Universal Context & Permissions",
  description:
    "Interactive system-level UX prototypes exploring identity clarity and permissions previews across devices and products.",
  openGraph: {
    title: "KMD Systems Lab · Core Experience Prototypes",
    description:
      "Universal Account Context Bar and Permissions Preview Layer — system-level UX to reduce friction and prevent defects.",
    url: "https://your-domain-here.com", // swap to your Vercel URL later
    siteName: "KMD Systems Lab",
    images: [
      {
        url: "/og-kmd-systems.png",
        width: 1200,
        height: 630,
        alt: "KMD Systems Lab core experience prototypes",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-slate-100 antialiased">
        {/* Skip link for keyboard / screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-sm focus:text-slate-50 focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
