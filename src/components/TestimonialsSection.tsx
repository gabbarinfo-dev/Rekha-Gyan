"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aditya Vardhan Sharma",
      location: "Bengaluru, India",
      role: "Fintech Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      query: "Fundraising Dilemma & Saturn Dasha Timing",
      review:
        "Main 3 mahine se do alag-alag astrologers ke paas gaya. Ek ne kaha Shani dasha mein sab dub jayega aur ₹45,000 ki puja maangi. Rekha ne mere right palm ki Fate Line aur Jupiter Mount ka split analyze karke bataya ki Nov-Dec mein overseas investor aayega. Exactly usi window mein hamara term sheet sign hua! Unbelievable accuracy.",
      rating: 5,
      date: "Verified 2 days ago",
    },
    {
      name: "Priyanka R. Deshmukh",
      location: "Mumbai, India",
      role: "Senior Product Architect",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
      query: "Marriage & Foreign Relocation Timing",
      review:
        "The detail with which REKHA analyzed my Left vs Right palm was jaw-dropping. She identified the tiny fork on my Heart line and linked it to my Ketu Mahadasha transition. The emotional clarity and practical remedies she suggested gave me peace of mind no street baba ever could.",
      rating: 5,
      date: "Verified 1 week ago",
    },
    {
      name: "Rohit Mathur",
      location: "Delhi NCR, India",
      role: "Supply Chain Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
      query: "Job Switch or Independent Business?",
      review:
        "Duniya ka pehla system jo actually logic aur classical Hastasanjivani quotes ke saath explain karta hai. Rekha ne mere Mount of Mercury aur Head line ki slant se bataya ki mujhe consulting shuru karni chahiye. Aaj mere paas 4 recurring clients hain. 100% recommended!",
      rating: 5,
      date: "Verified 3 weeks ago",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Quote className="w-3.5 h-3.5 text-gold-400" />
          Real People. Proven Accuracy.
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          What Seekers Say About REKHA
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Over 12,000+ conscious individuals across the globe have experienced the transformative clarity of our dual Palm &amp; Vedic Astro synthesis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="cosmic-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-gold-500/40 transition-all duration-300"
          >
            <div>
              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-gold-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  {t.date}
                </span>
              </div>

              {/* Tag / Topic */}
              <div className="inline-block text-[11px] font-semibold text-gold-300 bg-gold-500/10 px-2.5 py-1 rounded-lg border border-gold-500/20 mb-3">
                Focus: {t.query}
              </div>

              {/* Review Quote */}
              <p className="text-sm text-slate-200 leading-relaxed italic">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            {/* Author Profile */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3.5">
              <img
                src={t.image}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border border-gold-500/40 shadow-sm"
              />
              <div>
                <div className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                  {t.name}
                </div>
                <div className="text-xs text-slate-400">
                  {t.role} &bull; <span className="text-slate-500">{t.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
