"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";

interface PalmScannerInteractiveProps {
  onSelectLine?: (lineName: string) => void;
}

export default function PalmScannerInteractive({ onSelectLine }: PalmScannerInteractiveProps) {
  const [activeLine, setActiveLine] = useState<string | null>(null);

  const lines = [
    {
      id: "heart",
      name: "Hridaya Rekha (Heart Line)",
      meaning: "Emotional nobility, true romance, empathy & subconscious heart vibration",
      color: "#f43f5e",
      path: "M 280 230 C 230 200, 160 210, 110 270",
      mount: "Mount of Jupiter & Saturn",
    },
    {
      id: "head",
      name: "Matri Rekha (Head Line)",
      meaning: "Intellect, cognitive focus, strategic brilliance & visionary capacity",
      color: "#38bdf8",
      path: "M 100 290 C 170 270, 220 290, 275 350",
      mount: "Upper Mount of Mars & Moon",
    },
    {
      id: "life",
      name: "Pitri Rekha (Life Line)",
      meaning: "Vitality, longevity, resilience, physical energy & major life transitions",
      color: "#10b981",
      path: "M 100 290 C 130 340, 145 420, 130 490",
      mount: "Mount of Venus (Shukra)",
    },
    {
      id: "fate",
      name: "Bhagya Rekha (Fate / Saturn Line)",
      meaning: "Career destiny, sudden financial ascents, karmic protection & self-made empire",
      color: "#fbbf24",
      path: "M 195 480 C 190 380, 185 300, 180 190",
      mount: "Mount of Saturn (Shani)",
    },
    {
      id: "sun",
      name: "Surya Rekha (Sun / Fame Line)",
      meaning: "Public prestige, societal honor, artistic charisma & high financial wealth",
      color: "#f59e0b",
      path: "M 235 340 C 235 290, 235 240, 235 195",
      mount: "Mount of Apollo / Sun (Surya)",
    },
  ];

  return (
    <div className="relative w-full max-w-[440px] mx-auto select-none">
      {/* Mystical outer aura circle */}
      <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-mystic-purple/20 via-gold-500/10 to-indigo-900/30 blur-2xl animate-pulse-slow pointer-events-none" />

      <div className="relative rounded-3xl p-6 bg-cosmic-900/80 border border-gold-500/20 backdrop-blur-md shadow-2xl shadow-purple-950/40">
        {/* Header indicator */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wider uppercase text-gold-300">
              Interactive Palm Vision
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-gold-400" />
            <span>Hover on lines</span>
          </div>
        </div>

        {/* Sacred Palm SVG Graphic */}
        <div className="relative flex justify-center py-2">
          <svg
            viewBox="0 0 380 540"
            className="w-full max-w-[340px] h-auto filter drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]"
          >
            {/* Hand Silhouette */}
            <path
              d="M 120 520 C 80 480, 60 410, 60 330 C 60 280, 50 250, 40 220 C 35 200, 45 185, 65 190 C 80 195, 95 240, 105 270 C 105 210, 110 130, 120 90 C 125 70, 145 70, 150 90 C 160 140, 160 200, 160 230 C 165 170, 175 90, 185 50 C 190 30, 210 30, 215 50 C 225 110, 225 180, 225 230 C 230 180, 240 110, 250 80 C 255 60, 275 60, 280 80 C 285 130, 280 200, 280 240 C 285 210, 300 170, 315 155 C 330 140, 345 155, 340 175 C 330 220, 310 290, 310 350 C 310 430, 280 480, 240 520 Z"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.5"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
            />

            {/* Hand Fill Gradient */}
            <path
              d="M 120 520 C 80 480, 60 410, 60 330 C 60 280, 50 250, 40 220 C 35 200, 45 185, 65 190 C 80 195, 95 240, 105 270 C 105 210, 110 130, 120 90 C 125 70, 145 70, 150 90 C 160 140, 160 200, 160 230 C 165 170, 175 90, 185 50 C 190 30, 210 30, 215 50 C 225 110, 225 180, 225 230 C 230 180, 240 110, 250 80 C 255 60, 275 60, 280 80 C 285 130, 280 200, 280 240 C 285 210, 300 170, 315 155 C 330 140, 345 155, 340 175 C 330 220, 310 290, 310 350 C 310 430, 280 480, 240 520 Z"
              fill="rgba(45, 27, 78, 0.2)"
            />

            {/* Mount indicator circles */}
            <g className="mount-nodes opacity-70">
              {/* Jupiter Mount */}
              <circle cx="135" cy="220" r="16" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="135" y="224" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">♃</text>

              {/* Saturn Mount */}
              <circle cx="185" cy="210" r="16" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="185" y="214" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">♄</text>

              {/* Sun Mount */}
              <circle cx="235" cy="215" r="16" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="235" y="219" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">☉</text>

              {/* Mercury Mount */}
              <circle cx="280" cy="235" r="16" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="280" y="239" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">☿</text>

              {/* Venus Mount */}
              <circle cx="105" cy="400" r="22" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="105" y="404" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">♀</text>

              {/* Moon Mount */}
              <circle cx="260" cy="420" r="22" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1" />
              <text x="260" y="424" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">☽</text>
            </g>

            {/* Glowing Palmistry Lines */}
            {lines.map((line) => {
              const isSelected = activeLine === line.id;
              return (
                <g
                  key={line.id}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => {
                    setActiveLine(line.id);
                    onSelectLine?.(line.name);
                  }}
                  onMouseLeave={() => setActiveLine(null)}
                  onClick={() => {
                    setActiveLine(line.id);
                    onSelectLine?.(line.name);
                  }}
                >
                  {/* Outer Glow Halo */}
                  <path
                    d={line.path}
                    fill="none"
                    stroke={line.color}
                    strokeWidth={isSelected ? "14" : "7"}
                    strokeOpacity={isSelected ? "0.6" : "0.2"}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {/* Core Sharp Line */}
                  <path
                    d={line.path}
                    fill="none"
                    stroke={isSelected ? "#ffffff" : line.color}
                    strokeWidth={isSelected ? "4" : "2.5"}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Line Inspector Card */}
        <div className="mt-4 p-3.5 rounded-2xl bg-cosmic-800/90 border border-gold-500/30 min-h-[78px] flex items-center transition-all duration-300">
          {activeLine ? (
            <div className="w-full">
              {(() => {
                const item = lines.find((l) => l.id === activeLine);
                if (!item) return null;
                return (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-gold-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        {item.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                        {item.mount}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="w-full text-center text-xs text-slate-400 py-1">
              ✨ <span className="text-gold-300 font-medium">Hover on any line</span> to reveal its classical Hastarekha significance
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
