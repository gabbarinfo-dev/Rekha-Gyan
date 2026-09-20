"use client";

import React, { useState } from "react";
import { X, HeartHandshake, Upload, Camera, AlertCircle, Sparkles, Check, Trash2, ArrowRight } from "lucide-react";

export interface SecondaryPersonData {
  name: string;
  relation: string;
  dob: string;
  tob?: string;
  pob: string;
  leftPalmBase64?: string;
  rightPalmBase64?: string;
}

interface SecondaryPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: SecondaryPersonData) => void;
  initialRelation?: string;
}

export default function SecondaryPersonModal({
  isOpen,
  onClose,
  onConfirm,
  initialRelation = "Partner / Spouse",
}: SecondaryPersonModalProps) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState(initialRelation);
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [leftPalmBase64, setLeftPalmBase64] = useState("");
  const [rightPalmBase64, setRightPalmBase64] = useState("");
  const [leftPreview, setLeftPreview] = useState("");
  const [rightPreview, setRightPreview] = useState("");
  const [showMissingPalmWarning, setShowMissingPalmWarning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const relationshipOptions = [
    "Boyfriend",
    "Girlfriend",
    "Husband",
    "Wife",
    "Fiancé / Partner",
    "Mother",
    "Father",
    "Business Partner",
    "Friend",
    "Other",
  ];

  // Client-side image resize helper
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await processImage(file);
      if (side === "left") {
        setLeftPalmBase64(b64);
        setLeftPreview(b64);
      } else {
        setRightPalmBase64(b64);
        setRightPreview(b64);
      }
    } catch (err) {
      console.error("Image processing error:", err);
    } finally {
      e.target.value = "";
    }
  };

  const handleValidateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob || !pob.trim()) {
      setError("Please fill in Name, Date of Birth, and Place of Birth.");
      return;
    }

    // Check if palm photos are missing
    if (!leftPalmBase64 && !rightPalmBase64) {
      setShowMissingPalmWarning(true);
      return;
    }

    submitFinal();
  };

  const submitFinal = () => {
    onConfirm({
      name: name.trim(),
      relation,
      dob,
      tob: tob.trim() || undefined,
      pob: pob.trim(),
      leftPalmBase64: leftPalmBase64 || undefined,
      rightPalmBase64: rightPalmBase64 || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 sm:pt-16 pb-16 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto p-6 sm:p-7 rounded-3xl bg-cosmic-900 border border-gold-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden text-slate-100">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-gradient-to-b from-rose-500/15 via-gold-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-gold-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
              <span>Partner / Second Person Details</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                Synastry
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Provide their birth or palm details so REKHA can cross-analyze compatibility &amp; karmic timing.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Fallback Warning Notice Modal Step */}
        {showMissingPalmWarning ? (
          <div className="py-4 space-y-4 animate-scaleUp text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white font-serif">
                Partner Palm Photos Missing
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                You haven&apos;t uploaded palm photos for <strong className="text-gold-300">{name}</strong>. 
                Evaluation will proceed based on birth chart planetary calculations (Ashta Kuta, Lagna compatibility &amp; Dasha transit).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white">What will be analyzed:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                <li>36 Guna Ashta Kuta compatibility calculation</li>
                <li>Mental, emotional &amp; spiritual planetary synastry</li>
                <li>Manglik Dosha and Dasha overlap</li>
              </ul>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowMissingPalmWarning(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Upload Palm Photos Now
              </button>

              <button
                type="button"
                onClick={submitFinal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue with Birth Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleValidateAndProceed} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Their Full Name <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya or Rahul"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Relationship Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Relationship with You <span className="text-gold-400">*</span>
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950/80 border border-white/10 text-white text-xs focus:border-gold-400 focus:outline-none"
                >
                  {relationshipOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Their Date of Birth <span className="text-gold-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950/80 border border-white/10 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Time of Birth */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Time of Birth (Optional)
                </label>
                <input
                  type="time"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950/80 border border-white/10 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Place of Birth */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Their Place of Birth <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pob}
                  onChange={(e) => setPob(e.target.value)}
                  placeholder="e.g. Delhi, India or Chicago, USA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Optional Palm Upload Section */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">
                  Their Palm Photos (Optional but unlocks deep line synastry)
                </span>
                <span className="text-[10px] text-slate-400">Can proceed without</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Left Palm */}
                <div className="p-3 rounded-2xl bg-cosmic-950/60 border border-white/10 text-center space-y-2">
                  <div className="text-[11px] font-medium text-slate-300">Left Palm</div>
                  {leftPreview ? (
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-gold-500/40">
                      <img src={leftPreview} alt="Left Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setLeftPreview("");
                          setLeftPalmBase64("");
                        }}
                        className="absolute top-1 right-1 p-1 rounded-md bg-red-950/80 text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <label className="cursor-pointer py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3 text-gold-400" /> Browse
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "left")}
                        />
                      </label>
                      <label className="cursor-pointer py-1.5 px-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 text-[11px] font-medium flex items-center justify-center gap-1">
                        <Camera className="w-3 h-3" /> Camera
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "left")}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Right Palm */}
                <div className="p-3 rounded-2xl bg-cosmic-950/60 border border-white/10 text-center space-y-2">
                  <div className="text-[11px] font-medium text-slate-300">Right Palm</div>
                  {rightPreview ? (
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-gold-500/40">
                      <img src={rightPreview} alt="Right Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setRightPreview("");
                          setRightPalmBase64("");
                        }}
                        className="absolute top-1 right-1 p-1 rounded-md bg-red-950/80 text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <label className="cursor-pointer py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1">
                        <Upload className="w-3 h-3 text-gold-400" /> Browse
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "right")}
                        />
                      </label>
                      <label className="cursor-pointer py-1.5 px-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 text-[11px] font-medium flex items-center justify-center gap-1">
                        <Camera className="w-3 h-3" /> Camera
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "right")}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-between border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save &amp; Analyze Partner</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
