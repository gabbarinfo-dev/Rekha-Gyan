"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, Smartphone, Zap } from "lucide-react";

interface PalmScannerInteractiveProps {
  onSelectLine?: (lineName: string) => void;
}

export default function PalmScannerInteractive({ onSelectLine }: PalmScannerInteractiveProps) {
  const [activeLine, setActiveLine] = useState<string | null>("heart"); // Default active for immediate wow factor

  const lines = [
    {
      id: "heart",
      shortName: "Heart",
      sanskrit: "Hridaya",
      name: "Hridaya Rekha (Heart Line)",
      meaning: "Emotional nobility, true romance, empathy & subconscious heart vibrations.",
      color: "#f43f5e",
      glowColor: "rgba(244, 63, 94, 0.45)",
      path: "M 280 230 C 230 200, 160 210, 110 270",
      mount: "Jupiter & Saturn",
      emoji: "💗",
    },
    {
      id: "head",
      shortName: "Head",
      sanskrit: "Matri",
      name: "Matri Rekha (Head Line)",
      meaning: "Intellect, cognitive focus, strategic brilliance & visionary capacity.",
      color: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.45)",
      path: "M 100 290 C 170 270, 220 290, 275 350",
      mount: "Mars & Moon",
      emoji: "🧠",
    },
    {
      id: "life",
      shortName: "Life",
      sanskrit: "Pitri",
      name: "Pitri Rekha (Life Line)",
      meaning: "Vitality, longevity, resilience, physical energy & major life transitions.",
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.45)",
      path: "M 100 290 C 130 340, 145 420, 130 490",
      mount: "Mount of Venus",
      emoji: "🌿",
    },
    {
      id: "fate",
      shortName: "Fate",
      sanskrit: "Bhagya",
      name: "Bhagya Rekha (Fate Line)",
      meaning: "Career destiny, sudden financial ascents, karmic protection & self-made empire.",
      color: "#fbbf24",
      glowColor: "rgba(251, 191, 36, 0.45)",
      path: "M 195 480 C 190 380, 185 300, 180 190",
      mount: "Mount of Saturn",
      emoji: "🌟",
    },
    {
      id: "sun",
      shortName: "Sun",
      sanskrit: "Surya",
      name: "Surya Rekha (Sun Line)",
      meaning: "Public prestige, societal honor, artistic charisma & high financial wealth.",
      color: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.45)",
      path: "M 235 340 C 235 290, 235 240, 235 195",
      mount: "Mount of Apollo",
      emoji: "☀️",
    },
  ];

  const handleSelect = (lineId: string) => {
    setActiveLine(lineId);
    const item = lines.find((l) => l.id === lineId);
    if (item) onSelectLine?.(item.name);
  };

  const activeItem = lines.find((l) => l.id === activeLine) || null;

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[440px] mx-auto select-none">
      {/* Floating Ambient Glow Orbs */}
      <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-gold-500/15 blur-2xl animate-float pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-purple-600/20 blur-2xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative rounded-3xl p-4 sm:p-5 bg-cosmic-900/85 border border-gold-500/25 backdrop-blur-xl shadow-2xl shadow-purple-950/40 overflow-hidden">
        
        {/* Header with live AI pulse & hint */}
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-gold-300">
              Interactive Palm Vision
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            <span className="hidden sm:inline-flex items-center gap-1 text-gold-300/90">
              <Eye className="w-3 h-3 text-gold-400" /> Hover or Tap
            </span>
            <span className="sm:hidden inline-flex items-center gap-1 text-gold-300/90">
              <Smartphone className="w-3 h-3 text-gold-400" /> Touch any line
            </span>
          </div>
        </div>

        {/* Sacred Palm SVG Graphic Container */}
        <div className="relative flex justify-center py-1 overflow-hidden rounded-2xl bg-black/20 border border-white/[0.04]">
          {/* Animated AI Vision Laser Scanline */}
          <motion.div
            className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent pointer-events-none z-10 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]"
            animate={{
              top: ["10%", "85%", "10%"],
              opacity: [0.3, 0.95, 0.3],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute right-2 -top-3.5 text-[8px] tracking-widest text-gold-300 font-mono flex items-center gap-1 bg-cosmic-950/80 px-1.5 py-0.5 rounded border border-gold-500/30">
              <span className="w-1 h-1 rounded-full bg-gold-400 animate-ping" />
              AI SCAN
            </div>
          </motion.div>

          <svg
            viewBox="0 0 380 540"
            className="w-full max-w-[310px] sm:max-w-[350px] h-auto filter drop-shadow-[0_0_20px_rgba(212,175,55,0.12)]"
          >
            {/* Hand Silhouette Outline */}
            <path
              d="M 120 520 C 80 480, 60 410, 60 330 C 60 280, 50 250, 40 220 C 35 200, 45 185, 65 190 C 80 195, 95 240, 105 270 C 105 210, 110 130, 120 90 C 125 70, 145 70, 150 90 C 160 140, 160 200, 160 230 C 165 170, 175 90, 185 50 C 190 30, 210 30, 215 50 C 225 110, 225 180, 225 230 C 230 180, 240 110, 250 80 C 255 60, 275 60, 280 80 C 285 130, 280 200, 280 240 C 285 210, 300 170, 315 155 C 330 140, 345 155, 340 175 C 330 220, 310 290, 310 350 C 310 430, 280 480, 240 520 Z"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.5"
              strokeOpacity="0.4"
              strokeDasharray="4 4"
            />

            {/* Hand Mystical Fill */}
            <path
              d="M 120 520 C 80 480, 60 410, 60 330 C 60 280, 50 250, 40 220 C 35 200, 45 185, 65 190 C 80 195, 95 240, 105 270 C 105 210, 110 130, 120 90 C 125 70, 145 70, 150 90 C 160 140, 160 200, 160 230 C 165 170, 175 90, 185 50 C 190 30, 210 30, 215 50 C 225 110, 225 180, 225 230 C 230 180, 240 110, 250 80 C 255 60, 275 60, 280 80 C 285 130, 280 200, 280 240 C 285 210, 300 170, 315 155 C 330 140, 345 155, 340 175 C 330 220, 310 290, 310 350 C 310 430, 280 480, 240 520 Z"
              fill="rgba(45, 27, 78, 0.25)"
            />

            {/* Mount indicator planetary circles */}
            <g className="mount-nodes pointer-events-none">
              {/* Jupiter Mount */}
              <circle cx="135" cy="220" r="15" fill={activeLine === "heart" ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.12)"} stroke="#d4af37" strokeWidth={activeLine === "heart" ? "2" : "1"} />
              <text x="135" y="224" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">♃</text>

              {/* Saturn Mount */}
              <circle cx="185" cy="210" r="15" fill={activeLine === "fate" ? "rgba(251,191,36,0.35)" : "rgba(212,175,55,0.12)"} stroke="#d4af37" strokeWidth={activeLine === "fate" ? "2" : "1"} />
              <text x="185" y="214" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">♄</text>

              {/* Sun Mount */}
              <circle cx="235" cy="215" r="15" fill={activeLine === "sun" ? "rgba(245,158,11,0.35)" : "rgba(212,175,55,0.12)"} stroke="#d4af37" strokeWidth={activeLine === "sun" ? "2" : "1"} />
              <text x="235" y="219" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">☉</text>

              {/* Mercury Mount */}
              <circle cx="280" cy="235" r="15" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="280" y="239" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">☿</text>

              {/* Venus Mount */}
              <circle cx="105" cy="400" r="20" fill={activeLine === "life" ? "rgba(16,185,129,0.3)" : "rgba(212,175,55,0.12)"} stroke="#d4af37" strokeWidth={activeLine === "life" ? "2" : "1"} />
              <text x="105" y="404" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">♀</text>

              {/* Moon Mount */}
              <circle cx="260" cy="420" r="20" fill={activeLine === "head" ? "rgba(56,189,248,0.3)" : "rgba(212,175,55,0.12)"} stroke="#d4af37" strokeWidth={activeLine === "head" ? "2" : "1"} />
              <text x="260" y="424" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">☽</text>
            </g>

            {/* VISIBLE Glowing Palmistry Lines (pointer-events-none to NEVER jitter or vibrate) */}
            {lines.map((line) => {
              const isSelected = activeLine === line.id;
              return (
                <g key={`visual-${line.id}`} className="pointer-events-none">
                  {/* Outer Glow Halo */}
                  <path
                    d={line.path}
                    fill="none"
                    stroke={line.color}
                    strokeWidth={isSelected ? 16 : 8}
                    strokeOpacity={isSelected ? 0.75 : 0.18}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                  {/* Secondary Glow Beam */}
                  {isSelected && (
                    <path
                      d={line.path}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={8}
                      strokeOpacity={0.4}
                      strokeLinecap="round"
                    />
                  )}
                  {/* Core Sharp Line */}
                  <path
                    d={line.path}
                    fill="none"
                    stroke={isSelected ? "#ffffff" : line.color}
                    strokeWidth={isSelected ? 4 : 2.5}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* INVISIBLE WIDE HIT AREAS (36px wide touch targets for stable mobile tap & zero desktop jitter) */}
            {lines.map((line) => (
              <path
                key={`hit-${line.id}`}
                d={line.path}
                fill="none"
                stroke="transparent"
                strokeWidth="36"
                strokeLinecap="round"
                className="cursor-pointer"
                style={{ pointerEvents: "stroke" }}
                onMouseEnter={() => handleSelect(line.id)}
                onClick={() => handleSelect(line.id)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(line.id);
                }}
              />
            ))}
          </svg>
        </div>

        {/* Quick Tap Pills for Mobile & Desktop (Effortless 1-Tap Access) */}
        <div className="mt-3 pt-2.5 border-t border-white/5">
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
            {lines.map((l) => {
              const isSelected = activeLine === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleSelect(l.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all shrink-0 active:scale-95 ${
                    isSelected
                      ? "bg-white/15 text-white border shadow-md font-semibold"
                      : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                  style={{
                    borderColor: isSelected ? l.color : undefined,
                    boxShadow: isSelected ? `0 0 12px ${l.glowColor}` : undefined,
                  }}
                >
                  <span className="text-xs">{l.emoji}</span>
                  <span>{l.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fixed Height Active Line Inspector Card (Guarantees ZERO Layout Shift & ZERO Screen Vibration) */}
        <div className="mt-2.5 p-3 rounded-2xl bg-cosmic-800/90 border border-gold-500/30 h-[92px] sm:h-[90px] flex flex-col justify-center overflow-hidden transition-all duration-200">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs sm:text-sm text-gold-300 flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span className="truncate">{activeItem.name}</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/25 shrink-0 font-medium">
                    {activeItem.mount}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-snug line-clamp-2">
                  {activeItem.meaning}
                </p>
              </motion.div>
            ) : (
              <div className="w-full text-center text-xs text-slate-400 py-1">
                ✨ <span className="text-gold-300 font-medium">Tap any line or button above</span> to reveal classical Hastarekha traits
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
