"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  HelpCircle,
  Upload,
  Camera,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ReadingDisplay from "./ReadingDisplay";

interface ReadingFormProps {
  initialFocus?: string;
}

export default function ReadingForm({ initialFocus }: ReadingFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("12:00");
  const [pob, setPob] = useState("");
  const [lifeFocus, setLifeFocus] = useState(initialFocus || "Career & Wealth Breakthrough");
  const [question, setQuestion] = useState("");

  const [leftPalmBase64, setLeftPalmBase64] = useState<string>("");
  const [rightPalmBase64, setRightPalmBase64] = useState<string>("");
  const [leftPreview, setLeftPreview] = useState<string>("");
  const [rightPreview, setRightPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any | null>(null);

  const focusOptions = [
    "Career & Wealth Breakthrough",
    "Love, Marriage & Relationship Destiny",
    "Business, Investments & Foreign Settlement",
    "Health, Vitality & Mental Peace",
    "Spiritual Awakening & Karmic Lessons",
  ];

  const quickQuestions = [
    "When will my career take a major leap, and will I relocate?",
    "Is starting my own venture favored under my current dasha?",
    "When will I meet my genuine life partner, and how will our bond be?",
    "What specific gemstone and remedies will remove my present financial blockage?",
  ];

  // File to base64 converter with size limit
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("Image is too large. Please upload an image under 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      if (side === "left") {
        setLeftPalmBase64(b64);
        setLeftPreview(b64);
      } else {
        setRightPalmBase64(b64);
        setRightPreview(b64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob || !pob.trim() || !question.trim()) {
      setError("Please fill in your Name, Date of Birth, Place of Birth, and your Question.");
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStage(1);

    // Animated loading stages
    const timer1 = setTimeout(() => setLoadingStage(2), 2200);
    const timer2 = setTimeout(() => setLoadingStage(3), 4800);
    const timer3 = setTimeout(() => setLoadingStage(4), 8500);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          dob,
          tob,
          pob,
          lifeFocus,
          question,
          leftPalmBase64: leftPalmBase64 || undefined,
          rightPalmBase64: rightPalmBase64 || undefined,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate reading");
      }

      setResultData(data);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong while consulting the stars. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStage(0);
    }
  };

  const handleReset = () => {
    setResultData(null);
    setStep(1);
    setQuestion("");
  };

  if (resultData) {
    return (
      <ReadingDisplay
        reading={resultData.reading}
        insights={resultData.insights}
        vedicChart={resultData.vedicChart}
        consensus={resultData.consensus}
        onReset={handleReset}
      />
    );
  }

  return (
    <div id="reading-form" className="w-full max-w-3xl mx-auto">
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-gold-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Ask REKHA Your Deepest Question
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                onClick={() => {
                  if (num < step) setStep(num as any);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  step === num
                    ? "bg-gradient-to-br from-gold-300 to-amber-400 text-cosmic-950 shadow-md shadow-gold-500/40 scale-110"
                    : num < step
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                    : "bg-white/5 text-slate-500 border border-white/5"
                }`}
              >
                {num < step ? "✓" : num}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="py-16 text-center space-y-6 animate-fadeIn">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-gold-500/20 animate-spin-slow" />
              <div className="absolute inset-1 rounded-full border-4 border-t-gold-400 border-r-transparent border-b-purple-500 border-l-transparent animate-spin" />
              <span className="text-3xl font-serif text-gold-300 font-bold animate-pulse">
                र
              </span>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <div className="text-lg font-bold text-white font-serif">
                {loadingStage === 1 && "Aligning Sidereal Nirayana Zodiac & Kundali..."}
                {loadingStage === 2 && "Searching 50+ Classical Palmistry Manuscripts..."}
                {loadingStage === 3 && "Analyzing Mounts, Lines & Sacred Marks via Vision AI..."}
                {loadingStage >= 4 && "Channeling REKHA's First-Person Discourse..."}
              </div>
              <p className="text-xs text-slate-400">
                Cross-referencing Brihat Samhita, Hastasanjivani, and Cheiro&apos;s principles...
              </p>
            </div>

            <div className="w-48 mx-auto h-1.5 rounded-full bg-cosmic-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold-400 to-purple-500 rounded-full animate-shimmer" />
            </div>
          </div>
        )}

        {!loading && (
          <form onSubmit={handleSubmit}>
            {/* STEP 1: Personal Coordinates */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Your Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary / Other">Non-binary / Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      Date of Birth <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                    />
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      Time of Birth
                    </label>
                    <input
                      type="time"
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white focus:border-gold-400 focus:outline-none text-sm transition-all"
                    />
                  </div>

                  {/* Place of Birth */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      Place of Birth (City, Country) <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pob}
                      onChange={(e) => setPob(e.target.value)}
                      placeholder="e.g. Mumbai, India or London, UK"
                      className="w-full px-4 py-3 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!name || !dob || !pob) {
                        setError("Please fill in Name, Date of Birth, and Place of Birth.");
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all"
                  >
                    Continue to Question <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Question & Life Focus */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Life Focus Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Select Your Life Focus Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {focusOptions.map((f, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setLifeFocus(f)}
                        className={`p-3 rounded-2xl text-left text-xs font-medium border transition-all ${
                          lifeFocus === f
                            ? "bg-gold-500/15 text-gold-200 border-gold-500/40 shadow-sm shadow-gold-500/20"
                            : "bg-white/[0.02] text-slate-300 border-white/5 hover:border-gold-500/20"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specific Question */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>What is your specific question for REKHA? *</span>
                    <span className="text-[11px] text-gold-400 lowercase font-normal">
                      be honest &amp; specific
                    </span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about your career crossroad, marriage prospects, business timing, or emotional blockages..."
                    className="w-full p-4 rounded-2xl bg-cosmic-950/70 border border-white/10 text-white placeholder-slate-500 focus:border-gold-400 focus:outline-none text-sm transition-all leading-relaxed"
                  />
                </div>

                {/* Quick question suggestions */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 text-gold-400" />
                    Popular Queries:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setQuestion(q)}
                        className="text-[11px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-gold-500/10 text-slate-300 hover:text-gold-200 border border-white/5 hover:border-gold-500/20 text-left transition-all"
                      >
                        &ldquo;{q}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Back to Personal Details
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!question.trim()) {
                        setError("Please enter your question.");
                        return;
                      }
                      setError(null);
                      setStep(3);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all"
                  >
                    Continue to Palm Photos <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Palm Photo Upload & Synthesis */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center max-w-md mx-auto space-y-1 mb-6">
                  <h4 className="text-lg font-bold text-white font-serif">
                    Upload Palm Photos (Optional but Recommended)
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Uploading your left and right palms enables REKHA&apos;s neural vision to cross-reference mount elevations and sacred markings (Matsya, Trishul) with your Kundali.
                  </p>
                </div>

                {/* Upload Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Palm */}
                  <div className="p-4 rounded-2xl bg-cosmic-950/60 border border-white/10 hover:border-gold-500/30 transition-all text-center space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                      Left Palm (Inborn Potential)
                    </div>

                    {leftPreview ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gold-500/40">
                        <img
                          src={leftPreview}
                          alt="Left Palm Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLeftPalmBase64("");
                            setLeftPreview("");
                          }}
                          className="absolute top-2 right-2 bg-cosmic-950/80 text-xs px-2 py-1 rounded-md text-red-300 border border-red-500/30"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-gold-400/50 hover:bg-gold-500/[0.02] transition-all">
                        <Upload className="w-6 h-6 text-gold-400 mb-1" />
                        <span className="text-xs font-medium text-slate-300">
                          Upload Left Palm
                        </span>
                        <span className="text-[10px] text-slate-500">
                          JPG, PNG up to 8MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "left")}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Right Palm */}
                  <div className="p-4 rounded-2xl bg-cosmic-950/60 border border-white/10 hover:border-gold-500/30 transition-all text-center space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                      Right Palm (Active Destiny)
                    </div>

                    {rightPreview ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gold-500/40">
                        <img
                          src={rightPreview}
                          alt="Right Palm Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setRightPalmBase64("");
                            setRightPreview("");
                          }}
                          className="absolute top-2 right-2 bg-cosmic-950/80 text-xs px-2 py-1 rounded-md text-red-300 border border-red-500/30"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-gold-400/50 hover:bg-gold-500/[0.02] transition-all">
                        <Upload className="w-6 h-6 text-gold-400 mb-1" />
                        <span className="text-xs font-medium text-slate-300">
                          Upload Right Palm
                        </span>
                        <span className="text-[10px] text-slate-500">
                          JPG, PNG up to 8MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "right")}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gold-500/5 border border-gold-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Your photos are analyzed privately with encrypted end-to-end security. Even if you skip photo upload, REKHA will generate a complete Sidereal Vedic Kundali &amp; Dasha reading.
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Back to Question
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Reveal My Destiny with REKHA
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
