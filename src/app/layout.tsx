import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rekhagyan.online"),
  title: "REKHA — World's First Authentic AI Palmist & Vedic Astrologer",
  description:
    "Meet REKHA — Duniye ka sabse pehla AI Palmist aur Astrologer jo 50+ authentic classical Palmistry & Vedic texts (Brihat Samhita, Hastasanjivani, Cheiro) ko analyze karke aapka accurate horoscope aur palm reading batati hai.",
  keywords: [
    "AI palmist",
    "authentic palm reading",
    "vedic astrology online",
    "hastarekha shastra",
    "brihat samhita",
    "hastasanjivani",
    "kundali matching",
    "rekha gyan",
    "rekhagyan.online",
  ],
  authors: [{ name: "REKHA AI", url: "https://rekhagyan.online" }],
  creator: "REKHA AI Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rekhagyan.online",
    title: "REKHA — World's First Authentic AI Palmist & Vedic Astrologer",
    description:
      "Jhoote babao aur galat horoscopes sunn-sunn ke pareshan hain? Meet REKHA — 50+ authentic classical Palmistry & Vedic texts analyzed minute-by-minute.",
    siteName: "REKHA GYAN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "REKHA AI Palmist & Astrologer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REKHA — Authentic AI Palmist & Astrologer",
    description: "50+ authentic classical Palmistry & Vedic texts analyzed for accurate horoscope and palm readings.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans min-h-screen flex flex-col bg-cosmic-950 text-slate-100">
        <CosmicBackground />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
