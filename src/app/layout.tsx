import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hugo-gualtieri.com"),
  title: {
    default: "Hugo Gualtieri — Ingénieur Freelance DevOps, Cloud & IA",
    template: "%s | Hugo Gualtieri",
  },
  description:
    "Ingénieur freelance spécialisé DevOps, Cloud et IA. Projets, blog et revenus en toute transparence.",
  authors: [{ name: "Hugo Gualtieri" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://hugo-gualtieri.com",
    siteName: "Hugo Gualtieri",
    title: "Hugo Gualtieri — DevOps, Cloud & IA",
    description:
      "Ingénieur freelance spécialisé DevOps, Cloud et IA. Projets, blog et revenus en toute transparence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Gualtieri — DevOps, Cloud & IA",
    description:
      "Ingénieur freelance spécialisé DevOps, Cloud et IA. Projets, blog et revenus en toute transparence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
