"use client";

import React from "react";
import { Sparkles, Heart, Shield, ArrowRight } from "lucide-react";

interface SpecializedServicesCardsProps {
  onSelectService?: (serviceId: string) => void;
}

export default function SpecializedServicesCards({ onSelectService }: SpecializedServicesCardsProps) {
  const handleAction = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    }
    // Also dispatch custom event for ReadingForm listener
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("rekha_select_service", { detail: serviceId }));
    }
    // Scroll smoothly to reading form
    const element = document.getElementById("reading-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#reading-form";
    }
  };

  const services = [
    // 1st: Kundali D1 & D9 Navamsha (Gold/Amber)
    {
      id: "trial_99",
      icon: "🪐",
      title: "KUNDALI D1 & D9 NAVAMSHA",
      desc: "Sateek Lagna chart, grah dasha aur gochara faladesh ka instant shastriya ganit.",
      cardBg: "bg-gradient-to-b from-amber-950/20 via-cosmic-950/80 to-cosmic-950",
      cardBorder: "border-amber-500/30 hover:border-amber-400/70",
      iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
      btnClass:
        "bg-amber-500/15 hover:bg-gradient-to-r hover:from-amber-400 hover:to-gold-400 text-amber-300 hover:text-cosmic-950 border border-amber-500/30",
    },
    // 2nd: Vedic Match Making & Kundli Milan (Cyan/Blue)
    {
      id: "duo_599",
      icon: "💍",
      title: "VEDIC MATCH MAKING & KUNDLI MILAN",
      desc: "Ashta-Koota 36 guna milan aur shastriya grah maitri se jeevan saathi ki sateek parakh.",
      cardBg: "bg-gradient-to-b from-cyan-950/20 via-cosmic-950/80 to-cosmic-950",
      cardBorder: "border-cyan-500/30 hover:border-cyan-400/70",
      iconBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
      btnClass:
        "bg-cyan-500/15 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 text-cyan-300 hover:text-cosmic-950 border border-cyan-500/30",
    },
    // 3rd: Khoya Pyar Wapas Paayen & Get Your Ex Back (Rose/Crimson)
    {
      id: "love_ex_249",
      icon: "❤️",
      title: "KHOYA PYAR WAPAS PAAYEN & GET YOUR EX BACK",
      desc: "Shukra-Chandra synastry aur algaav dosh shanti dwara dil ki dooriyan khatam karne ka shastriya path.",
      cardBg: "bg-gradient-to-b from-rose-950/25 via-cosmic-950/80 to-cosmic-950",
      cardBorder: "border-rose-500/35 hover:border-rose-400/70",
      iconBg: "bg-rose-500/15 border-rose-500/30 text-rose-300",
      btnClass:
        "bg-rose-500/15 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 text-rose-300 hover:text-white border border-rose-500/35",
    },
    // 4th: Intercaste Marriage & Parivaar Manana (Purple/Indigo)
    {
      id: "intercaste_349",
      icon: "✨",
      title: "INTERCASTE MARRIAGE & PARIVAAR MANANA",
      desc: "Guru-Chandal & Pitra dosh shanti aur parents ko raazi karne ki shastriya neeti va anushthan.",
      cardBg: "bg-gradient-to-b from-purple-950/25 via-cosmic-950/80 to-cosmic-950",
      cardBorder: "border-purple-500/35 hover:border-purple-400/70",
      iconBg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
      btnClass:
        "bg-purple-500/15 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 text-purple-300 hover:text-white border border-purple-500/35",
    },
    // 5th: Ghar Main Kalesh Se Mukti & Saas Se Banti Nahi? (Emerald/Mint)
    {
      id: "kalesh_saas_299",
      icon: "🛡️",
      title: "GHAR MAIN KALESH SE MUKTI & SAAS SE BANTI NAHI?",
      desc: "Griha Bhava aur Matru-Pitri graha krodh ko shaant karke parivaar me aadar aur sukh-shanti ka vaas.",
      cardBg: "bg-gradient-to-b from-emerald-950/25 via-cosmic-950/80 to-cosmic-950",
      cardBorder: "border-emerald-500/35 hover:border-emerald-400/70",
      iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
      btnClass:
        "bg-emerald-500/15 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-emerald-300 hover:text-cosmic-950 border border-emerald-500/35",
    },
    // 6th: Deep Question Vedic Guidance (Royal Gold/Purple)
    {
      id: "unlimited_1009",
      icon: "🔮",
      title: "DEEP QUESTION VEDIC GUIDANCE",
      desc: "Career, dhan ya niji jeevan ke kisi bhi gambhir sandeh ka 50+ scriptures se sateek samadhan.",
      cardBg: "bg-gradient-to-b from-yellow-950/20 via-cosmic-950/80 to-cosmic-950",
      cardBorder: "border-yellow-500/30 hover:border-yellow-400/70",
      iconBg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",
      btnClass:
        "bg-yellow-500/15 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 text-yellow-300 hover:text-cosmic-950 border border-yellow-500/30",
    },
  ];

  return (
    <div className="w-full mb-16 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`rounded-3xl p-6 sm:p-7 border ${srv.cardBorder} ${srv.cardBg} transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl flex flex-col justify-between`}
          >
            <div>
              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-2xl border ${srv.iconBg} flex items-center justify-center text-xl mb-5 shadow-inner`}
              >
                <span>{srv.icon}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif font-extrabold text-sm sm:text-base text-white tracking-wide mb-3 leading-snug">
                {srv.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-6 font-normal">
                {srv.desc}
              </p>
            </div>

            {/* CTA Button - NO PRICES */}
            <div>
              <button
                type="button"
                onClick={() => handleAction(srv.id)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-between transition-all duration-200 cursor-pointer ${srv.btnClass}`}
              >
                <span>Start Reading</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
