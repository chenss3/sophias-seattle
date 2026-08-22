import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sophia's Seattle",
  description: "A living, curated guide to Seattle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
