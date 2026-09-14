import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import Link from "next/link";

import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";

import "./globals.css";

/**
 * Fredoka carries display and heading text; Nunito Sans carries body and
 * functional interface text. See docs/design.md for the art direction and the
 * reasoning behind the pairing. Both load through `next/font` so the files are
 * self hosted and the layout does not shift as they arrive.
 */
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sophia's Seattle",
    template: "%s | Sophia's Seattle",
  },
  description: "A living, curated guide to Seattle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunitoSans.variable}`}>
      <body className="bg-canvas text-ink flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main"
          className="focus:bg-surface focus:ring-ink sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:ring-2"
        >
          Skip to content
        </a>

        <header className="border-edge border-b">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-5 sm:px-6">
            <Link
              href="/"
              className="font-display text-ink focus-visible:outline-ink rounded-sm text-lg focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Sophia&apos;s Seattle
            </Link>
            <Link
              href="/recommendations"
              className="text-ink focus-visible:outline-ink rounded-full text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Recommendations
            </Link>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-edge border-t">
          <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-6">
            {/*
              Optional art region: `footer-motif`. A small Seattle motif may sit
              beside this note later. Nothing is rendered until real artwork
              exists.
            */}
            <p className="text-ink/75 text-sm">
              {placeholderSiteCopy.footer.note}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
