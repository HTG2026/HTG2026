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
  kidsAges: {
    prompt: "If kids are coming — what ages? (Skip if none)",
    opts: [
      { value: "none", label: "No kids / Skip" },
      { value: "toddlers", label: "Toddlers (2–5)" },
      { value: "elementary", label: "Elementary (6–11)" },
      { value: "teens", label: "Teens (12+)" },
      { value: "mixed", label: "Mixed ages" },
    ],
  },
  duration: {
    prompt: "How long is your day?",
    opts: [
      { value: "half", label: "Half day (4–5 hrs)" },
      { value: "full", label: "Full day (8–10 hrs)" },
      { value: "multi", label: "Multi-day / Flexible" },
    ],
  },
  vibe: {
    prompt: "What's your vibe?",
    opts: [
      { value: "parks", label: "Theme parks 🎢" },
      { value: "local", label: "Local spots & food 🍽️" },
      { value: "mix", label: "Mix of both 🤙" },
      { value: "nightlife", label: "Nightlife 🍹" },
      { value: "shows", label: "Live shows & culture 🎭" },
    ],
  },
  style: {
    prompt: "What matters most?",
    opts: [
      { value: "thrills", label: "Thrill rides & coasters" },
      { value: "shows", label: "Shows & entertainment" },
      { value: "food", label: "Food & dining" },
      { value: "relax", label: "Relaxation & scenery" },
      { value: "mix", label: "Mix of everything" },
    ],
  },
  dietary: {
    prompt: "Any dietary preferences?",
    opts: [
      { value: "none", label: "No restrictions" },
      { value: "veg", label: "Vegetarian options" },
      { value: "vegan", label: "Vegan options" },
      { value: "gf", label: "Gluten-free" },
      { value: "skip", label: "Skip / Not sure" },
    ],
  },
  mobility: {
    prompt: "Walking / mobility?",
    opts: [
      { value: "all-good", label: "All good — lots of walking" },
      { value: "moderate", label: "Prefer less walking" },
      { value: "accessible", label: "Need accessible options" },
    ],
  },
  budget: {
    prompt: "Budget per person (slide to set)",
    isSlider: true,
    min: 25,
    max: 500,
    default: 100,
  },
};

const STEP_ORDER: (keyof typeof STEPS)[] = [
  "group",
  "kidsAges",
  "duration",
  "vibe",
  "style",
  "dietary",
  "mobility",
  "budget",
];

function budgetToKey(val: number): "under50" | "50-150" | "150-300" | "300plus" {
  if (val < 50) return "under50";
  if (val < 150) return "50-150";
  if (val < 300) return "150-300";
  return "300plus";
}

export default function PlanMyDay() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [done, setDone] = useState(false);

  const step = STEP_ORDER[stepIndex];
  const currentStep = STEPS[step];

  const handlePick = (key: string, value: string | number) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (stepIndex < STEP_ORDER.length - 1) {
      const skipKids = step === "kidsAges" && (value === "none" || value === "skip");
      setStepIndex((i) => (skipKids ? i + 2 : i + 1));
    } else {
      setDone(true);
    }
  };

  const budgetVal =
    (answers.budget as number) ?? (currentStep as { default?: number }).default ?? 100;
  const itinerary = done
    ? generateItinerary(
        (answers.group as "solo" | "couple" | "squad" | "family") || "couple",
        (answers.vibe as "parks" | "local" | "mix" | "nightlife" | "shows") || "mix",
        budgetToKey(budgetVal),
        {
          kidsAges: answers.kidsAges as string,
          duration: answers.duration as string,
          style: answers.style as string,
          dietary: answers.dietary as string,
          mobility: answers.mobility as string,
        }
      )
    : null;

  return (
    <div className="py-16 px-6 sm:px-12 max-w-4xl mx-auto bg-htbg">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">
        Chatbot-Powered
      </div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4 text-htdark">
        <span className="text-teal">Plan My Day</span>
      </h1>
      <p className="text-slate-600 text-lg max-w-xl mb-12">
        Answer a few questions so we can curate your perfect Central Florida day from real Orlando
        experiences. In 5 clicks or less.
      </p>

      {!done ? (
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <p className="text-sm text-htdark mb-4">{currentStep.prompt}</p>

          {"isSlider" in currentStep && currentStep.isSlider ? (
            <div className="space-y-4">
              <input
                type="range"
                min={currentStep.min}
                max={currentStep.max}
                value={budgetVal}
                onChange={(e) => setAnswers({ ...answers, budget: Number(e.target.value) })}
                className="w-full h-2 rounded-full appearance-none bg-slate-200 accent-orange"
              />
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">${currentStep.min}</span>
                <span className="font-bold text-orange">${budgetVal} / person</span>
                <span className="text-slate-500">${currentStep.max}</span>
              </div>
              <button
                onClick={() => handlePick("budget", budgetVal)}
                className="w-full py-3 rounded-full bg-orange text-white font-semibold hover:bg-[#e04510] transition-colors"
              >
                Continue →
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(currentStep as { opts?: { value: string; label: string }[] }).opts?.map(
                (opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handlePick(step, opt.value)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-htcard2 border border-slate-200 text-slate-700 hover:bg-orange/10 hover:border-orange/40 hover:text-orange transition-all"
                  >
                    {opt.label}
                  </button>
                )
              )}
            </div>
          )}

          {stepIndex > 0 && (
            <button
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="mt-4 text-[.7rem] text-slate-500 hover:text-htdark"
            >
              ← Back
            </button>
          )}
        </div>
      ) : itinerary ? (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-teal/30 bg-teal/5 shadow-sm">
            <h2 className="text-lg font-semibold text-teal mb-2">📍 {itinerary.title}</h2>
            <p className="text-sm text-slate-600 mb-4">{itinerary.budgetEst}</p>
            <div className="space-y-3">
              {itinerary.stops.map((stop, i) => (
                <div
                  key={i}
                  className="flex gap-3 py-2 border-b border-slate-200 last:border-0"
                >
                  <span className="text-[.7rem] font-bold text-orange shrink-0 w-14">
                    {stop.time}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        {stop.emoji} {stop.name}
                      </span>
                      {stop.bookUrl && (
                        <a
                          href={stop.bookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[.65rem] font-semibold text-teal hover:text-teal/80 underline shrink-0"
                        >
                          {/Magic Kingdom|Epcot|Hollywood|Animal Kingdom|Universal|SeaWorld|Kennedy|Gatorland|ICON Park|Boggy Creek|Wild Florida|Balloon|Paddleboard|Wekiwa|Scooter/i.test(
                            stop.name
                          )
                            ? "Get tickets →"
                            : "Reserve →"}
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{stop.detail}</p>
                    {stop.priceHint && (
                      <span className="text-[.65rem] text-amber-700">{stop.priceHint}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <strong className="text-amber-800">💡 Pro tip:</strong> <span className="text-amber-900">{itinerary.proTip}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/explore"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-teal/10 border border-teal/40 text-teal hover:bg-teal/20 transition-all"
            >
              Explore more spots →
            </Link>
            <button
              onClick={() => {
                setDone(false);
                setAnswers({});
                setStepIndex(0);
              }}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-htcard2 border border-slate-200 text-slate-600 hover:bg-slate-200 transition-all"
            >
              Start over
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
