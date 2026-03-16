"use client";

import { useState } from "react";
import { generateItinerary } from "@/lib/itinerary-engine";
import Link from "next/link";

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

  const itinerary = done
    ? generateItinerary(
        (answers.group as "solo" | "couple" | "squad" | "family") || "couple",
        (answers.vibe as "parks" | "local" | "mix" | "nightlife") || "mix",
        (answers.budget as "under50" | "50-150" | "150-300" | "300plus") || "50-150"
      )
    : null;

  return (
    <div className="py-16 px-6 sm:px-12 max-w-4xl mx-auto">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">AI-Powered</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
        <span className="text-teal">Plan My Day</span>
      </h1>
      <p className="text-white/50 text-lg max-w-xl mb-12">
        Tell us your party size, interests, and budget. We&apos;ll build your perfect Central Florida day from real Orlando spots.
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
      ) : itinerary ? (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-teal/20 bg-teal/5">
            <h2 className="text-lg font-semibold text-teal mb-2">📍 {itinerary.title}</h2>
            <p className="text-sm text-white/40 mb-4">{itinerary.budgetEst}</p>
            <div className="space-y-3">
              {itinerary.stops.map((stop, i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className="text-[.7rem] font-bold text-orange shrink-0 w-14">{stop.time}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{stop.emoji} {stop.name}</span>
                      {stop.bookUrl && (
                        <a
                          href={stop.bookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[.65rem] font-semibold text-teal hover:text-teal/80 underline shrink-0"
                        >
                          {/Magic Kingdom|Epcot|Hollywood|Animal Kingdom|Universal|SeaWorld|Kennedy|Gatorland|ICON Park|Boggy Creek|Wild Florida|Balloon|Paddleboard|Wekiwa|Scooter/i.test(stop.name) ? "Get tickets →" : "Reserve →"}
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{stop.detail}</p>
                    {stop.priceHint && (
                      <span className="text-[.65rem] text-gold">{stop.priceHint}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/20">
              <strong className="text-gold">💡 Pro tip:</strong> {itinerary.proTip}
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/explore"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-teal/20 border border-teal/40 text-teal hover:bg-teal/30 transition-all"
            >
              Explore more spots →
            </Link>
            <button
              onClick={() => { setDone(false); setAnswers({}); setStep("group"); }}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-all"
            >
              Start over
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
