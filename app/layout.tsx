import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Lalith Sagar Kambala — Portfolio",
    template: "%s — Portfolio",
  },
  description:
    "Software engineer — full-stack, AI, and 0→1 product work. KS, USA; open to relocate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full scroll-smooth bg-[var(--surface)] font-sans text-stone-900">{children}</body>
    </html>
  );
}
