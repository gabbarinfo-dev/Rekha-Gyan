import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#06050e",
};

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
      "Fake babao aur galat horoscopes sunn-sunn ke pareshan hain? Meet REKHA — 50+ authentic classical Palmistry & Vedic texts analyzed minute-by-minute.",
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

import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1634113744768909');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1634113744768909&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-cosmic-950 text-slate-100 overflow-x-hidden w-full max-w-full">
        <AuthProvider>
          <LanguageProvider>
            <CosmicBackground />
            <Navbar />
            <main className="flex-grow relative z-10 w-full max-w-full overflow-x-hidden pt-20">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
