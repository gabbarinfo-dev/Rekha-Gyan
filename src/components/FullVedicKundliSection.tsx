"use client";

import React, { useState, useMemo } from "react";
import {
  Download,
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  AlertCircle,
  FileText,
  Star,
  Printer,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { calculateFullKundli, FullKundliData, GrahaPosition } from "@/lib/kundli-calculator";

interface FullVedicKundliSectionProps {
  userName?: string;
  userDob?: string;
  userTob?: string;
  userPob?: string;
  onUnlockPlan?: () => void;
}

/**
 * North Indian Vedic Diamond Chart SVG
 */
function NorthIndianDiamondChart({
  houses,
  title,
  subtitle,
}: {
  houses: FullKundliData["d1Houses"] | FullKundliData["d9Houses"];
  title: string;
  subtitle: string;
}) {
  // Center coordinates for each house's planets & rashi number in North Indian diamond layout
  const houseCoords: Record<number, { px: number; py: number; rx: number; ry: number }> = {
    1: { px: 200, py: 80, rx: 200, ry: 135 },
    2: { px: 100, py: 45, rx: 140, ry: 50 },
    3: { px: 45, py: 100, rx: 50, ry: 140 },
    4: { px: 85, py: 200, rx: 135, ry: 200 },
    5: { px: 45, py: 300, rx: 50, ry: 260 },
    6: { px: 100, py: 355, rx: 140, ry: 350 },
    7: { px: 200, py: 320, rx: 200, ry: 265 },
    8: { px: 300, py: 355, rx: 260, ry: 350 },
    9: { px: 355, py: 300, rx: 350, ry: 260 },
    10: { px: 315, py: 200, rx: 265, ry: 200 },
    11: { px: 355, py: 100, rx: 350, ry: 140 },
    12: { px: 300, py: 45, rx: 260, ry: 50 },
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-3xl bg-black/40 border border-gold-500/25 shadow-xl relative overflow-hidden">
      <div className="text-center mb-3">
        <h4 className="text-sm font-bold font-serif text-gold-300 tracking-wide">{title}</h4>
        <p className="text-[11px] text-slate-400">{subtitle}</p>
      </div>

      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[340px] sm:max-w-[380px] aspect-square drop-shadow-md"
      >
        <defs>
          <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="houseBgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e1065" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#090514" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Backdrop */}
        <rect x="5" y="5" width="390" height="390" fill="url(#houseBgGrad)" rx="12" />

        {/* Outer Square */}
        <rect
          x="5"
          y="5"
          width="390"
          height="390"
          fill="none"
          stroke="url(#chartLineGrad)"
          strokeWidth="2.5"
          rx="12"
        />

        {/* Diagonals */}
        <line x1="5" y1="5" x2="395" y2="395" stroke="url(#chartLineGrad)" strokeWidth="1.5" />
        <line x1="5" y1="395" x2="395" y2="5" stroke="url(#chartLineGrad)" strokeWidth="1.5" />

        {/* Inner Diamond */}
        <polygon
          points="200,5 395,200 200,395 5,200"
          fill="none"
          stroke="url(#chartLineGrad)"
          strokeWidth="2"
        />

        {/* Render each house's Rashi number and Grahas */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hNum) => {
          const h = houses[hNum];
          const coords = houseCoords[hNum];
          if (!h || !coords) return null;

          return (
            <g key={hNum}>
              {/* Rashi Number */}
              <text
                x={coords.rx}
                y={coords.ry}
                fill="#f59e0b"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
                opacity="0.9"
              >
                {h.signNumber}
              </text>

              {/* Planets inside house */}
              <text
                x={coords.px}
                y={coords.py}
                fill="#ffffff"
                fontSize="10"
                fontWeight="700"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                {h.planets.length === 0 ? (
                  ""
                ) : (
                  h.planets.map((p, idx) => (
                    <tspan
                      key={idx}
                      x={coords.px}
                      dy={idx === 0 ? 0 : 12}
                      fill={
                        p.name === "Sun"
                          ? "#fcd34d"
                          : p.name === "Moon"
                          ? "#e0e7ff"
                          : p.name === "Mars"
                          ? "#f87171"
                          : p.name === "Mercury"
                          ? "#4ade80"
                          : p.name === "Jupiter"
                          ? "#fbbf24"
                          : p.name === "Venus"
                          ? "#f472b6"
                          : p.name === "Saturn"
                          ? "#818cf8"
                          : "#c084fc"
                      }
                    >
                      {p.abbr}
                      {p.isRetrograde ? "(R)" : ""}
                    </tspan>
                  ))
                )}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 text-[10px] text-amber-200/80 font-medium">
        Lagna House: Top Diamond (House 1) • Numbers = Rashi (1-12)
      </div>
    </div>
  );
}

export default function FullVedicKundliSection({
  userName = "Aapka Naam",
  userDob = "1995-01-01",
  userTob = "12:00",
  userPob = "India",
  onUnlockPlan,
}: FullVedicKundliSectionProps) {
  const { user, isEligibleForKundli, canDownloadKundli, recordKundliDownload } = useAuth();
  const [activeTab, setActiveTab] = useState<"charts" | "planets" | "panchang" | "dasha">("charts");
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Compute full shastric kundli
  const kundliData = useMemo(() => {
    return calculateFullKundli({
      name: userName,
      dob: userDob,
      tob: userTob,
      pob: userPob,
    });
  }, [userName, userDob, userTob, userPob]);

  const isSubscribedEligible = isEligibleForKundli();
  const canDownload = canDownloadKundli(userName);

  // Download Trigger Handler
  const handleDownloadKundli = () => {
    if (!isSubscribedEligible) {
      if (onUnlockPlan) onUnlockPlan();
      return;
    }

    if (!canDownload) {
      setDownloadSuccessToast(
        "Aapka 1-time official Kundli download is profile ke liye pehle hi use ho chuka hai. Poori Kundli aap neeche screen par anytime refer kar sakte hain."
      );
      setTimeout(() => setDownloadSuccessToast(null), 6000);
      return;
    }

    // Record the 1-time download
    recordKundliDownload(userName);

    // Build standalone styled HTML file for instant offline preservation & printing
    const htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>${kundliData.userName} - Vedic Janma Kundli & Navamsha</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0c0817; color: #f1f5f9; padding: 24px; margin: 0; }
    .header { text-align: center; border-bottom: 2px solid #eab308; padding-bottom: 16px; margin-bottom: 24px; }
    .title { font-size: 26px; color: #fbbf24; font-weight: bold; margin: 0; }
    .subtitle { font-size: 13px; color: #94a3b8; margin-top: 6px; }
    .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; background: rgba(255,255,255,0.04); padding: 16px; border-radius: 12px; margin-bottom: 24px; border: 1px solid rgba(234,179,8,0.3); }
    .info-item { font-size: 12px; }
    .info-label { color: #94a3b8; text-transform: uppercase; font-size: 10px; font-weight: bold; }
    .info-val { color: #fff; font-weight: bold; margin-top: 2px; }
    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .chart-box { background: rgba(0,0,0,0.5); padding: 16px; border-radius: 16px; border: 1px solid rgba(234,179,8,0.3); text-align: center; }
    .chart-title { font-size: 16px; color: #fde047; font-weight: bold; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; background: rgba(0,0,0,0.3); }
    th { background: rgba(234,179,8,0.15); color: #fde047; text-align: left; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.1); }
    td { padding: 8px 12px; border: 1px solid rgba(255,255,255,0.06); }
    .section-title { font-size: 18px; color: #fbbf24; margin-top: 30px; margin-bottom: 10px; font-weight: bold; border-left: 4px solid #eab308; padding-left: 10px; }
    .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
    @media print { body { background: #fff; color: #000; padding: 0; } th { background: #eee; color: #000; } .info-val { color: #000; } }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size: 12px; color: #eab308; font-weight: bold; letter-spacing: 2px;">॥ ॐ श्री गणेशाय नमः ॥</div>
    <h1 class="title">श्री वैदिक जन्म कुण्डली एवं नवमांश चक्र</h1>
    <div class="subtitle">Authentic Nirayana Shastriya Calculations • Brihat Parashara Hora Shastra</div>
  </div>

  <div class="info-grid">
    <div class="info-item"><div class="info-label">Jataka Name</div><div class="info-val">${kundliData.userName}</div></div>
    <div class="info-item"><div class="info-label">Date of Birth</div><div class="info-val">${kundliData.dob}</div></div>
    <div class="info-item"><div class="info-label">Time of Birth</div><div class="info-val">${kundliData.tob}</div></div>
    <div class="info-item"><div class="info-label">Place of Birth</div><div class="info-val">${kundliData.pob}</div></div>
    <div class="info-item"><div class="info-label">Lagna (Ascendant)</div><div class="info-val">${kundliData.lagnaSignName} (${kundliData.lagnaDegree}°)</div></div>
    <div class="info-item"><div class="info-label">Janma Rashi</div><div class="info-val">${kundliData.panchang.vashya}</div></div>
    <div class="info-item"><div class="info-label">Birth Nakshatra</div><div class="info-val">${kundliData.panchang.nakshatra} (Pada ${kundliData.panchang.pada})</div></div>
    <div class="info-item"><div class="info-label">Ayanamsha</div><div class="info-val">${kundliData.panchang.ayanamsha}</div></div>
  </div>

  <div class="section-title">१. जन्म कुण्डली (D1) एवं नवमांश चक्र (D9)</div>
  <p style="font-size: 12px; color: #cbd5e1;">Lagna Chart reveals physical destiny, body, and major life pillars. Navamsha Chart (D9) reveals soul strength, inner dharma, and matrimonial fruit.</p>

  <div class="section-title">२. ग्रह स्पष्ट विवरण (Planetary Positions &amp; Dignities)</div>
  <table>
    <thead>
      <tr>
        <th>Graha (Planet)</th>
        <th>Rashi (Sign)</th>
        <th>Degree in Sign</th>
        <th>D1 Bhava</th>
        <th>D9 Bhava</th>
        <th>Nakshatra &amp; Pada</th>
        <th>Dignity (Avastha)</th>
      </tr>
    </thead>
    <tbody>
      ${kundliData.grahas
        .map(
          (g) => `
        <tr>
          <td><strong>${g.sanskrit}</strong> ${g.isRetrograde ? "(R)" : ""}</td>
          <td>${g.signSanskrit}</td>
          <td>${g.degInSign}°</td>
          <td>House ${g.houseD1}</td>
          <td>House ${g.houseD9}</td>
          <td>${g.nakshatra} (${g.pada})</td>
          <td>${g.dignity}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="section-title">३. पञ्चाङ्ग एवं अवकहड़ा चक्र (Panchang Details)</div>
  <table>
    <tr><th>Vaar (Day)</th><td>${kundliData.panchang.vaar}</td><th>Tithi</th><td>${kundliData.panchang.tithi}</td></tr>
    <tr><th>Yoga</th><td>${kundliData.panchang.yoga}</td><th>Karana</th><td>${kundliData.panchang.karana}</td></tr>
    <tr><th>Varna</th><td>${kundliData.panchang.varna}</td><th>Vashya</th><td>${kundliData.panchang.vashya}</td></tr>
    <tr><th>Gana</th><td>${kundliData.panchang.gana}</td><th>Nadi</th><td>${kundliData.panchang.nadi}</td></tr>
  </table>

  <div class="section-title">४. विंशोत्तरी महादशा चक्र (Vimshottari Dasha Timeline)</div>
  <table>
    <thead><tr><th>Mahadasha Lord</th><th>Duration</th><th>Start Year</th><th>End Year</th><th>Status</th></tr></thead>
    <tbody>
      ${kundliData.dashaTimeline
        .map(
          (d) => `
        <tr style="${d.isCurrent ? "background: rgba(234,179,8,0.2); font-weight: bold;" : ""}">
          <td>${d.sanskrit}</td>
          <td>${d.years} Years</td>
          <td>${d.startYear}</td>
          <td>${d.endYear}</td>
          <td>${d.isCurrent ? "★ CURRENT ACTIVE DASHA" : "Passed / Future"}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="section-title">५. शास्त्रीय रत्न एवं मन्त्र उपाय (Shastric Remedial Guidance)</div>
  <p style="font-size: 13px; line-height: 1.6;">
    <strong>Favorable Gemstone:</strong> ${kundliData.gemstoneRemedy.gemstone} (Wear in ${kundliData.gemstoneRemedy.finger} in ${kundliData.gemstoneRemedy.metal})<br/>
    <strong>Presiding Deity:</strong> ${kundliData.gemstoneRemedy.deity}<br/>
    <strong>Sacred Beej Mantra:</strong> <em>"${kundliData.gemstoneRemedy.beejMantra}"</em>
  </p>

  <div class="footer">
    Verified with Brihat Parashara Hora Shastra, Phaladeepika &amp; Saravali • Rekha AI Authentic Vedic Astrology Portal
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${kundliData.userName.replace(/\s+/g, "_")}_Vedic_Kundli.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessToast(
      "Aapki authentic Vedic Kundli download ho gayi hai! 1-time official access successfully utilized."
    );
    setTimeout(() => setDownloadSuccessToast(null), 6000);
  };

  return (
    <div id="full-vedic-kundli-section" className="w-full mt-10 space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-950/30 via-cosmic-950 to-purple-950/40 border border-gold-500/35 shadow-2xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-80 h-40 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>श्रीमद् पराशरोक्त प्रामाणिक जन्म कुण्डली</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Your Authentic Vedic Kundli (D1 &amp; D9)
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Brihat Parashara Hora Shastra aur classical Lahiri Ayanamsha ke niyamit ganit se banayi gayi aapki poori Janma Kundli, Navamsha chakra aur graha spashta talika.
            </p>
          </div>

          {/* DOWNLOAD BUTTON */}
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            {isSubscribedEligible ? (
              <button
                type="button"
                onClick={handleDownloadKundli}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-95 ${
                  canDownload
                    ? "text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 hover:shadow-gold-500/40 hover:scale-[1.02]"
                    : "text-slate-300 bg-white/10 border border-white/20 hover:bg-white/15"
                }`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{canDownload ? "Your Kundli" : "Your Kundli (Downloaded)"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onUnlockPlan) onUnlockPlan();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-gold-500/30 transition-all active:scale-95"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Your Kundli (₹99 / ₹499 / ₹999)</span>
              </button>
            )}

            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isSubscribedEligible
                  ? canDownload
                    ? "Available in your plan • 1-Time Official Download"
                    : "1-Time Official Access Completed"
                  : "Exclusive to 99 / 499 / 999 Subscribed Plans"}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback / Download Notification Toast */}
        {downloadSuccessToast && (
          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessToast}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pt-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("charts")}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "charts"
                ? "border-gold-400 text-gold-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            १. D1 &amp; D9 Charts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("planets")}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "planets"
                ? "border-gold-400 text-gold-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            २. Graha Spashta Table
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("panchang")}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "panchang"
                ? "border-gold-400 text-gold-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            ३. Avakhada &amp; Panchang
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dasha")}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "dasha"
                ? "border-gold-400 text-gold-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            ४. Vimshottari Timeline
          </button>
        </div>

        {/* TAB 1: D1 & D9 CHARTS */}
        {activeTab === "charts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 animate-fadeIn">
            <NorthIndianDiamondChart
              houses={kundliData.d1Houses}
              title={`Lagna Kundli (D1) • ${kundliData.lagnaSignName}`}
              subtitle="Physical Body, Vitality & Major Life Path"
            />
            <NorthIndianDiamondChart
              houses={kundliData.d9Houses}
              title={`Navamsha Kundli (D9) • ${kundliData.navamshaLagnaName}`}
              subtitle="Soul Dharma, Inner Fortitude & Marital Harmony"
            />
          </div>
        )}

        {/* TAB 2: GRAHA SPASHTA */}
        {activeTab === "planets" && (
          <div className="space-y-3 pt-2 animate-fadeIn">
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-gold-500/10 text-gold-300 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3">Graha</th>
                    <th className="p-3">Rashi</th>
                    <th className="p-3">Degree</th>
                    <th className="p-3">D1 Bhava</th>
                    <th className="p-3">D9 Bhava</th>
                    <th className="p-3">Nakshatra (Pada)</th>
                    <th className="p-3">Dignity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {kundliData.grahas.map((g, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            background:
                              g.name === "Sun"
                                ? "#fcd34d"
                                : g.name === "Moon"
                                ? "#e0e7ff"
                                : g.name === "Mars"
                                ? "#f87171"
                                : g.name === "Mercury"
                                ? "#4ade80"
                                : g.name === "Jupiter"
                                ? "#fbbf24"
                                : g.name === "Venus"
                                ? "#f472b6"
                                : g.name === "Saturn"
                                ? "#818cf8"
                                : "#c084fc",
                          }}
                        />
                        {g.sanskrit} {g.isRetrograde ? "(R)" : ""}
                      </td>
                      <td className="p-3">{g.signSanskrit}</td>
                      <td className="p-3 font-mono">{g.degInSign}°</td>
                      <td className="p-3 font-semibold text-amber-300">House {g.houseD1}</td>
                      <td className="p-3 font-semibold text-purple-300">House {g.houseD9}</td>
                      <td className="p-3">
                        {g.nakshatra} <span className="text-slate-400">({g.pada})</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            g.dignity.includes("उच्च") || g.dignity.includes("स्वक्षेत्र")
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : g.dignity.includes("नीच")
                              ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                              : "bg-white/5 text-slate-300"
                          }`}
                        >
                          {g.dignity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AVAKHADA & PANCHANG */}
        {activeTab === "panchang" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 animate-fadeIn">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Vaar (Day)</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.vaar}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Tithi</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.tithi}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Nakshatra</span>
              <div className="text-xs font-bold text-gold-300">
                {kundliData.panchang.nakshatra} (Pada {kundliData.panchang.pada})
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Yoga</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.yoga}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Karana</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.karana}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Varna</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.varna}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Gana</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.gana}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Nadi</span>
              <div className="text-xs font-bold text-white">{kundliData.panchang.nadi}</div>
            </div>
          </div>
        )}

        {/* TAB 4: VIMSHOTTARI TIMELINE */}
        {activeTab === "dasha" && (
          <div className="space-y-3 pt-2 animate-fadeIn">
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-gold-500/10 text-gold-300 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3">Mahadasha Lord</th>
                    <th className="p-3">Span</th>
                    <th className="p-3">Start Year</th>
                    <th className="p-3">End Year</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {kundliData.dashaTimeline.map((d, idx) => (
                    <tr
                      key={idx}
                      className={
                        d.isCurrent
                          ? "bg-gold-500/15 font-bold text-white"
                          : "hover:bg-white/[0.02]"
                      }
                    >
                      <td className="p-3 text-gold-200">{d.sanskrit}</td>
                      <td className="p-3">{d.years} Years</td>
                      <td className="p-3 font-mono">{d.startYear}</td>
                      <td className="p-3 font-mono">{d.endYear}</td>
                      <td className="p-3">
                        {d.isCurrent ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gold-400 text-cosmic-950">
                            ★ Active Now ({kundliData.currentMahadasha}-{kundliData.currentAntardasha})
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            {new Date().getFullYear() > d.endYear ? "Completed" : "Future"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
