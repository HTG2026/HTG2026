"use client";

import { useState } from "react";

const STEPS = {
  group: {
    prompt: "Who's coming with you?",
    opts: [
      { value: "solo", label: "Just me 🙋" },
      { value: "couple", label: "Couple 💑" },
      { value: "squad", label: "Squad 🎉" },
      { value: "family", label: "Family 👨‍👩‍👧" },
    ],
  },
  vibe: {
    prompt: "What's your vibe?",
    opts: [
      { value: "parks", label: "Theme parks 🎢" },
      { value: "local", label: "Local spots & food 🍽️" },
      { value: "mix", label: "Mix of both 🤙" },
      { value: "nightlife", label: "Nightlife 🍹" },
    ],
  },
  budget: {
    prompt: "Budget per person?",
    opts: [
      { value: "under50", label: "Under $50 💸" },
      { value: "50-150", label: "$50–$150 👌" },
      { value: "150-300", label: "$150–$300 🔥" },
      { value: "300plus", label: "$300+ 👑" },
    ],
  },
};

const MOCK_ITINERARY = {
  title: "Your Mix-of-Both Day",
  budget: "Est $80–$120 per person",
  stops: [
    { time: "9:00 AM", emoji: "☀️", name: "Magic Kingdom Rope Drop", detail: "Arrive 45 min early, hit TRON before any queue forms." },
    { time: "11:30 AM", emoji: "🍕", name: "Pinocchio Village Haus", detail: "$12 flatbreads, front-row view of It's a Small World boats." },
    { time: "2:00 PM", emoji: "🛺", name: "Scooter rental", detail: "Resort delivery. Saves 45 min of walking for a full park day." },
    { time: "6:30 PM", emoji: "🍹", name: "The Courtesy Bar", detail: "Local craft cocktails. Old Fashioned is unreal. Tourists never find it." },
  ],
  proTip: "Frozen Butterbeer > regular. Always. The cream foam changes everything.",
};

export default function PlanMyDay() {
  const [step, setStep] = useState<keyof typeof STEPS>("group");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const handlePick = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step === "group") setStep("vibe");
    else if (step === "vibe") setStep("budget");
    else {
      setDone(true);
    }
  };

  const currentStep = STEPS[step];

  return (
    <div className="py-16 px-6 sm:px-12 max-w-4xl mx-auto">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">AI-Powered</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
        <span className="text-teal">Plan My Day</span>
      </h1>
      <p className="text-white/50 text-lg max-w-xl mb-12">
        Tell us your party size, interests, and budget. We&apos;ll build your perfect Central Florida day.
      </p>

      {!done ? (
        <div className="p-6 rounded-xl border border-white/10 bg-htcard/50">
          <p className="text-sm text-white/70 mb-4">{currentStep.prompt}</p>
          <div className="flex flex-wrap gap-2">
            {currentStep.opts.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handlePick(step, opt.value)}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-white/70 hover:bg-orange/20 hover:border-orange/40 hover:text-orange transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {Object.keys(answers).length > 0 && (
            <p className="mt-4 text-[.7rem] text-white/40">
              Selected: {Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(" → ")}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-teal/20 bg-teal/5">
            <h2 className="text-lg font-semibold text-teal mb-2">📍 {MOCK_ITINERARY.title}</h2>
            <p className="text-sm text-white/40 mb-4">{MOCK_ITINERARY.budget}</p>
            <div className="space-y-3">
              {MOCK_ITINERARY.stops.map((stop, i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className="text-[.7rem] font-bold text-orange shrink-0 w-14">{stop.time}</span>
                  <div>
                    <span className="font-medium">{stop.emoji} {stop.name}</span>
                    <p className="text-sm text-white/50">{stop.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/20">
              <strong className="text-gold">💡 Pro tip:</strong> {MOCK_ITINERARY.proTip}
            </div>
          </div>
          <p className="text-sm text-white/40">
            Connect an AI API (e.g. Claude, OpenAI) to generate real itineraries. TikTok scrapers will prioritize trending spots.
          </p>
          <button
            onClick={() => { setDone(false); setAnswers({}); setStep("group"); }}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-teal/20 border border-teal/40 text-teal hover:bg-teal/30 transition-all"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
