import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KRISHNA AI - Divine Life Guidance System",
  description: "Ask life questions and receive Bhagavad Gita guidance with voice, avatar, meditation, quotes, reading, gallery, and growth tracking.",
  applicationName: "KRISHNA AI",
  keywords: ["Bhagavad Gita", "Krishna AI", "spiritual guidance", "meditation", "life advice"],
  authors: [{ name: "KRISHNA AI" }],
  openGraph: {
    title: "KRISHNA AI - Divine Life Guidance System",
    description: "A premium spiritual AI platform for Gita-based life guidance, voice, meditation, and growth.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05020d",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
