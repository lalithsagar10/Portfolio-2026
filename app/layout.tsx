import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lalith Sagar Kambala — Portfolio",
    template: "%s — Portfolio",
  },
  description:
    "Software engineer — full-stack, AI, and 0→1 product work. Austin, TX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full scroll-smooth bg-[var(--surface)] font-sans text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
