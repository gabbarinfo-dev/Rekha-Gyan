"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  HeartHandshake,
  Loader2,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Lock,
} from "lucide-react";
import Markdown from "markdown-to-jsx";
import { VedicChartResult, SynastryResult, calculateSynastry, calculateVedicChart } from "@/lib/vedic-engine";
import { PalmFeatures } from "@/lib/palm-extractor";
import { PujaVidhiData } from "@/lib/puja-vidhi";
import SecondaryPersonModal, { SecondaryPersonData } from "./SecondaryPersonModal";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isSynastryAlert?: boolean;
}

interface RekhaFollowupChatProps {
  userName?: string;
  userDob?: string;
  userQuestion?: string;
  vedicChart?: any;
  palmFeatures?: any;
  pujaVidhi?: any;
  synastry?: any;
  secondaryPerson?: {
    name: string;
    relation: string;
    dob?: string;
    tob?: string;
    pob?: string;
  };
  isUnlocked: boolean;
  onUnlockRequest?: () => void;
}

export default function RekhaFollowupChat({
  userName = "Seeker",
  userDob,
  userQuestion = "",
  vedicChart,
  palmFeatures,
  pujaVidhi,
  synastry: initialSynastry,
  secondaryPerson: initialSecondaryPerson,
  isUnlocked,
  onUnlockRequest,
}: RekhaFollowupChatProps) {
  const { user, isAdmin, consumeQuota } = useAuth();
  const { language } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-welcome",
      role: "assistant",
      content: `**Namaste ${userName || "Seeker"}.** I have preserved your celestial chart (*${vedicChart?.ascendant || "Lagna"} Ascendant, ${vedicChart?.moonSign || "Chandra"} Moon*) and palm crease markers in my memory.\n\nYou may now ask me any continuous follow-up questions regarding your career, relationship timing, sacred remedies, or compatibility. How may I guide you further?`,
      timestamp: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSecondaryPerson, setCurrentSecondaryPerson] = useState(initialSecondaryPerson);
  const [currentSynastry, setCurrentSynastry] = useState(initialSynastry);
  const [showSecondaryModal, setShowSecondaryModal] = useState(false);
  const [suggestedRelation, setSuggestedRelation] = useState("Partner / Spouse");
  const [pendingUserQuestion, setPendingUserQuestion] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Quota calculation
  const getQuestionsRemaining = () => {
    if (isAdmin || user?.subscriptionPlan === "unlimited_1009") return 999;
    if (user?.subscriptionPlan === "duo_599") {
      return (user.deepQuestionsRemaining ?? 5) + (user.partnerQuestionsRemaining ?? 2);
    }
    if (user?.subscriptionPlan === "trial_99") {
      return user.deepQuestionsRemaining ?? 2;
    }
    return isUnlocked ? 2 : 0;
  };

  const questionsRemaining = getQuestionsRemaining();
  const hasQuota = questionsRemaining > 0;

  // Enhanced second person detection in chat queries
  const detectSecondPersonInChat = (text: string): { isDetected: boolean; suggestedRelation: string } => {
    const q = text.toLowerCase();

    if (/\b(friend|friendship|bestie|best friend|dost|dosti|saheli|yaar|mitra|close friend)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Friend" };
    }
    if (/\b(husband|pati|hubby)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Husband" };
    }
    if (/\b(wife|patni|biwi)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Wife" };
    }
    if (/\b(boyfriend|bf|fianc[eé]|lover)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Boyfriend" };
    }
    if (/\b(girlfriend|gf)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Girlfriend" };
    }
    if (/\b(business partner|colleague|coworker|boss|partnership)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Business Partner" };
    }
    if (/\b(mother-in-law|father-in-law|saas|sasur|in-laws)\b/i.test(q)) {
      return { isDetected: true, suggestedRelation: "Family / In-Laws" };
    }

    const relationalTriggers = [
      /\b(marry|marriage|shaadi|vivaah|rishta|prem|affair|extra marital)\b/i,
      /\b(compatibility|compatible|guna milan|synastry|kundli match)\b/i,
      /\b(future with|together forever|relationship with|breakup with|patchup with)\b/i,
      /\b(what about|how is|check compatibility with)\s+([A-Z][a-z]+)\b/,
    ];

    if (relationalTriggers.some((r) => r.test(text))) {
      return { isDetected: true, suggestedRelation: "Partner / Spouse" };
    }

    return { isDetected: false, suggestedRelation: "Partner / Spouse" };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    if (!hasQuota && !isAdmin) {
      if (onUnlockRequest) {
        onUnlockRequest();
      }
      return;
    }

    // Check if the query references a second person and no secondary person is added yet (or asks about another person)
    const secondPersonCheck = detectSecondPersonInChat(query);
    if (secondPersonCheck.isDetected && !currentSecondaryPerson) {
      setPendingUserQuestion(query);
      setSuggestedRelation(secondPersonCheck.suggestedRelation);
      setShowSecondaryModal(true);
      return;
    }

    executeChatCall(query);
  };

  const executeChatCall = async (
    userText: string,
    overriddenSecondaryPerson = currentSecondaryPerson,
    overriddenSynastry = currentSynastry
  ) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          userName,
          userDob,
          userQuestion,
          vedicChart,
          palmFeatures,
          pujaVidhi,
          synastry: overriddenSynastry,
          secondaryPerson: overriddenSecondaryPerson,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to receive cosmic guidance at this moment.");
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Deduct quota if logged in
      if (!isAdmin) {
        consumeQuota("deepQuestion");
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ *${err.message || "An astrological network transit occurred. Please ask again in a moment."}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setPendingUserQuestion(null);
    }
  };

  const handleSecondaryPersonConfirm = (data: SecondaryPersonData) => {
    const secondaryInput = {
      name: data.name,
      relation: data.relation,
      dob: data.dob,
      tob: data.tob,
      pob: data.pob,
    };
    setCurrentSecondaryPerson(secondaryInput);
    setShowSecondaryModal(false);

    // Compute authentic live synastry using exact birth chart calculations
    let synastryResult = currentSynastry;
    if (vedicChart && data.dob && data.pob) {
      try {
        const secondaryChart = calculateVedicChart(data.dob, data.tob || "12:00", data.pob);
        synastryResult = calculateSynastry(vedicChart, secondaryChart, userName, data.name, data.relation);
        setCurrentSynastry(synastryResult);
      } catch (e) {
        console.warn("Live chat synastry calculation error:", e);
      }
    }

    // Post an alert in chat and proceed with pending question
    const alertMsg: ChatMessage = {
      id: `synastry-added-${Date.now()}`,
      role: "assistant",
      content: `✨ **Profile Linked:** Secondary person details for **${data.name}** (${data.relation}) have been integrated into your chart for live synastry and compatibility.`,
      timestamp: "Just now",
      isSynastryAlert: true,
    };
    setMessages((prev) => [...prev, alertMsg]);

    if (pendingUserQuestion) {
      executeChatCall(pendingUserQuestion, secondaryInput, synastryResult);
    }
  };

  const quickQuestions = [
    "When is my next favorable career breakthrough window?",
    "Which gemstone and deity sankalp should I prioritize first?",
    "Will travel, relocation, or business venture be auspicious?",
    currentSecondaryPerson
      ? `How compatible am I with ${currentSecondaryPerson.name}?`
      : "Check compatibility with another person",
  ];

  return (
    <div className="w-full my-8 rounded-3xl bg-gradient-to-b from-cosmic-900/90 via-cosmic-950 to-cosmic-900/90 border border-gold-500/30 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-500/20 via-amber-400/20 to-purple-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shadow-md">
              <Bot className="w-5 h-5 text-gold-300" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-cosmic-950 animate-pulse"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold font-serif text-white tracking-wide flex items-center gap-1.5">
                <span>Chat Live with REKHA</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
                  AI Sanctuary
                </span>
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
              Synced with your {vedicChart?.ascendant || "Vedic"} Lagna, {vedicChart?.moonSign || "Chandra"} Moon &amp; Palm Lines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quota Badge */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
            <MessageSquare className="w-3 h-3 text-gold-400" />
            {isAdmin || user?.subscriptionPlan === "unlimited_1009" ? (
              <span className="text-emerald-400 font-bold">Unlimited Inquiries</span>
            ) : (
              <span>
                <strong className="text-white font-bold">{questionsRemaining}</strong> questions left
              </span>
            )}
          </div>

          {/* Toggle Minimize/Maximize */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            title={isExpanded ? "Collapse Sanctuary" : "Expand Sanctuary"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col h-[520px] sm:h-[580px]">
          {/* Active Synastry Banner (if partner linked) */}
          {currentSecondaryPerson && (
            <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/20 flex items-center justify-between text-xs text-rose-200">
              <div className="flex items-center gap-2 truncate">
                <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">
                  Linked for Synastry: <strong className="text-white">{currentSecondaryPerson.name}</strong> ({currentSecondaryPerson.relation})
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSuggestedRelation(currentSecondaryPerson.relation);
                  setShowSecondaryModal(true);
                }}
                className="text-[11px] text-rose-300 underline hover:text-white shrink-0 ml-2"
              >
                Change
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.role === "user"
                      ? "bg-gradient-to-tr from-amber-400 to-gold-500 text-cosmic-950 font-bold"
                      : "bg-cosmic-800 border border-gold-500/30 text-gold-300"
                  }`}
                >
                  {msg.role === "user" ? <UserIcon className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed relative ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-amber-500/20 via-gold-500/15 to-amber-600/20 border border-gold-400/30 text-white rounded-tr-none shadow-md"
                      : msg.isSynastryAlert
                      ? "bg-rose-500/15 border border-rose-500/30 text-rose-100 rounded-tl-none"
                      : "bg-cosmic-950/80 border border-white/10 text-slate-200 rounded-tl-none shadow-lg"
                  }`}
                >
                  <div className="prose prose-invert prose-xs max-w-none prose-p:my-1 prose-headings:my-1.5 prose-strong:text-gold-300">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                  <span className="block text-[10px] text-slate-400 mt-2 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex gap-3 max-w-xl mr-auto animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-cosmic-800 border border-gold-500/30 flex items-center justify-center text-gold-300">
                  <Bot className="w-4 h-4 animate-spin text-gold-400" />
                </div>
                <div className="p-3.5 rounded-2xl bg-cosmic-950/80 border border-white/10 text-xs text-amber-200/90 rounded-tl-none flex items-center gap-2.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" />
                  <span>REKHA is cross-referencing your astrological dasha &amp; palm markers...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-4 py-2.5 bg-black/30 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-gold-400" /> Suggested:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={loading}
                className="px-3 py-1 rounded-full text-[11px] text-slate-300 hover:text-white bg-white/5 hover:bg-gold-500/15 border border-white/10 hover:border-gold-500/30 transition-all shrink-0 truncate max-w-xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box / Footer */}
          <div className="p-3 sm:p-4 bg-cosmic-950 border-t border-white/10">
            {!hasQuota && !isAdmin ? (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-gold-500/10 to-amber-500/10 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Lock className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>You have utilized your included follow-up questions. Top-up or upgrade for unlimited guidance.</span>
                </div>
                <button
                  type="button"
                  onClick={onUnlockRequest}
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all shrink-0"
                >
                  Unlock More Inquiries
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask REKHA anything about your timing, career, remedies, or compatibility..."
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-2xl bg-cosmic-900/90 border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-all"
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-3 rounded-2xl text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-400 hover:shadow-lg hover:shadow-gold-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 flex items-center justify-center"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            )}

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Vedic Memory Locked to your Sidereal Ephemeris &amp; Palm Lines
              </span>
              <span>Autonomous Vedic AI</span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Secondary Person Modal (Triggered inside chat) */}
      <SecondaryPersonModal
        isOpen={showSecondaryModal}
        initialRelation={suggestedRelation}
        onClose={() => {
          setShowSecondaryModal(false);
          // If user cancels, still proceed with chat for themselves
          if (pendingUserQuestion) {
            executeChatCall(pendingUserQuestion);
          }
        }}
        onSkip={() => {
          setShowSecondaryModal(false);
          if (pendingUserQuestion) {
            executeChatCall(pendingUserQuestion);
          }
        }}
        onConfirm={handleSecondaryPersonConfirm}
      />
    </div>
  );
}
