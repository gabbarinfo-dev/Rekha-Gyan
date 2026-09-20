import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — REKHA GYAN",
  description: "Strict privacy standards, encryption, and data protection policies for rekhagyan.online.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <ShieldCheck className="w-10 h-10 text-gold-400 mx-auto" />
        <h1 className="text-3xl font-extrabold text-white font-serif">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: September 2026 &bull; Domain: rekhagyan.online</p>
      </div>

      <div className="cosmic-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">1. Confidentiality of Astrological &amp; Palm Data</h2>
          <p>
            At REKHA GYAN (<a href="https://rekhagyan.online" className="text-gold-400">rekhagyan.online</a>), we consider your date of birth, time of birth, birth coordinates, and palm photographs to be sacred personal data. We do not sell, rent, or lease your private coordinates to data brokers or advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">2. Use of Images &amp; Computer Vision</h2>
          <p>
            Uploaded palm photos are analyzed strictly for the purpose of morphological feature extraction (measuring mounts, lines, and symbolic geometry). Photos are transferred using TLS encryption and stored securely.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">3. Third-Party Intelligence Engines</h2>
          <p>
            Anonymized queries are evaluated across authentic classical research repositories via our synthesis pipeline to compile consensus insights. No personally identifying financial or medical credentials are required or processed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gold-300 font-serif">4. Data Deletion Requests</h2>
          <p>
            You may request complete removal of your consultation records at any time by contacting our privacy officer via our official domain communications.
          </p>
        </section>
      </div>

      <div className="text-center">
        <Link href="/" className="text-xs text-gold-400 hover:underline">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}
