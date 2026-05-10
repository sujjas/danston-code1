"use client";

import { useEffect, useState } from "react";
import {
  AUDIENCES,
  WORK_MODES,
  type Audience,
  type AssessmentPayload,
  type WorkMode,
} from "@/lib/assessment";

const TOTAL_STEPS = 10;

type FormState = {
  audience: Audience | "";
  challenge: string;
  duration: string;
  triedBefore: string;
  successPicture: string;
  cost: string;
  commitment: number | null;
  workMode: WorkMode | "";
  source: string;
  nextStep: string;
  email: string;
};

const INITIAL: FormState = {
  audience: "",
  challenge: "",
  duration: "",
  triedBefore: "",
  successPicture: "",
  cost: "",
  commitment: null,
  workMode: "",
  source: "",
  nextStep: "",
  email: "",
};

const optionBase =
  "font-sans text-[13px] text-cream bg-cream/[0.04] border-[0.5px] border-cream/20 px-5 py-4.5 rounded-sm cursor-pointer transition-all duration-500 ease-smooth hover:border-gold hover:bg-gold/10 text-left";
const optionSelected = "border-gold bg-gold/15 text-gold";

const inputBase =
  "w-full bg-transparent border-0 border-b-[0.5px] border-cream/30 py-4 text-cream text-[16px] font-sans mb-9 transition-colors duration-500 ease-smooth focus:outline-none focus:border-gold placeholder:text-cream/35";

export function Assessment() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("code1.audience");
      if (stored && (AUDIENCES as readonly string[]).includes(stored)) {
        setState((s) => ({ ...s, audience: stored as Audience }));
      }
    } catch {
      /* ignore */
    }
    const onAudience = (e: Event) => {
      const detail = (e as CustomEvent<Audience>).detail;
      if (detail) setState((s) => ({ ...s, audience: detail }));
    };
    window.addEventListener("code1:audience", onAudience);
    return () => window.removeEventListener("code1:audience", onAudience);
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const canAdvance = () => {
    switch (step) {
      case 1: return state.audience !== "";
      case 2: return state.challenge.trim().length > 0;
      case 3: return state.duration.trim().length > 0;
      case 4: return state.triedBefore.trim().length > 0;
      case 5: return state.successPicture.trim().length > 0;
      case 6: return state.cost.trim().length > 0;
      case 7: return state.commitment !== null;
      case 8: return state.workMode !== "";
      case 9: return state.source.trim().length > 0;
      case 10:
        return (
          state.nextStep.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
        );
      default: return true;
    }
  };

  const next = () => {
    if (!canAdvance()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
    else void submit();
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (state.audience === "" || state.workMode === "" || state.commitment === null)
      return;
    setStatus("submitting");
    setErrorMessage(null);
    const payload: AssessmentPayload = {
      audience: state.audience,
      challenge: state.challenge.trim(),
      duration: state.duration.trim(),
      triedBefore: state.triedBefore.trim(),
      successPicture: state.successPicture.trim(),
      cost: state.cost.trim(),
      commitment: state.commitment,
      workMode: state.workMode,
      source: state.source.trim(),
      nextStep: state.nextStep.trim(),
      email: state.email.trim(),
    };
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      setStatus("done");
      setStep(TOTAL_STEPS + 1);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  const completed = status === "done";

  return (
    <section id="assessment" className="bg-navy text-cream px-14 py-40 max-md:px-6 max-md:py-25">
      <div className="max-w-[720px] mx-auto mb-20 text-center">
        <div className="reveal text-gold text-[11px] tracking-[3px] uppercase mb-7 inline-flex items-center before:inline-block before:w-8 before:h-px before:bg-gold before:mx-4 after:inline-block after:w-8 after:h-px after:bg-gold after:mx-4">
          The assessment
        </div>
        <h2 className="reveal font-serif font-normal text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.4px] mb-7">
          Is Code 1 right for you?
        </h2>
        <p className="reveal font-sans text-[19px] leading-[1.7] text-cream/75">
          Ten questions. Under ten minutes. Free. Reviewed personally by Danston
          or the Code 1 team within 48 hours.
        </p>
      </div>
      <div className="reveal reveal-delay-1 max-w-[720px] mx-auto bg-cream/[0.03] border-[0.5px] border-gold/30 rounded p-14 max-md:p-9 max-md:px-6">
        <div aria-hidden="true" className="flex gap-1 mb-9">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-0.5 transition-colors duration-500 ease-smooth ${
                i < step || completed ? "bg-gold" : "bg-cream/15"
              }`}
            />
          ))}
        </div>

        {!completed && step === 1 && (
          <Step n={1} q="Who are you?">
            <div className="grid grid-cols-2 gap-3 mb-9 max-md:grid-cols-1">
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`${optionBase} ${state.audience === a ? optionSelected : ""}`}
                  onClick={() => update("audience", a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </Step>
        )}

        {!completed && step === 2 && (
          <Step n={2} q="What is your single biggest challenge right now?">
            <textarea
              className={`${inputBase} min-h-[100px] resize-y leading-[1.6]`}
              placeholder="In your own words..."
              value={state.challenge}
              onChange={(e) => update("challenge", e.target.value)}
            />
          </Step>
        )}

        {!completed && step === 3 && (
          <Step n={3} q="How long has this been a challenge?">
            <input
              type="text"
              className={inputBase}
              placeholder="Months, years..."
              value={state.duration}
              onChange={(e) => update("duration", e.target.value)}
            />
          </Step>
        )}

        {!completed && step === 4 && (
          <Step n={4} q="What have you already tried?">
            <textarea
              className={`${inputBase} min-h-[100px] resize-y leading-[1.6]`}
              placeholder="Programmes, coaches, books, courses..."
              value={state.triedBefore}
              onChange={(e) => update("triedBefore", e.target.value)}
            />
          </Step>
        )}

        {!completed && step === 5 && (
          <Step n={5} q="What does success look like for you in 12 months?">
            <textarea
              className={`${inputBase} min-h-[100px] resize-y leading-[1.6]`}
              placeholder="Be as specific as you can..."
              value={state.successPicture}
              onChange={(e) => update("successPicture", e.target.value)}
            />
          </Step>
        )}

        {!completed && step === 6 && (
          <Step n={6} q="What is the cost of this challenge continuing?">
            <textarea
              className={`${inputBase} min-h-[100px] resize-y leading-[1.6]`}
              placeholder="Financial, personal, organisational..."
              value={state.cost}
              onChange={(e) => update("cost", e.target.value)}
            />
          </Step>
        )}

        {!completed && step === 7 && (
          <Step n={7} q="How committed are you to addressing this now?">
            <div className="grid grid-cols-10 gap-1.5 mb-9 max-md:grid-cols-5">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`bg-cream/[0.04] border-[0.5px] border-cream/20 py-3.5 rounded-sm font-sans text-[13px] text-cream cursor-pointer transition-all duration-500 ease-smooth text-center hover:border-gold ${
                    state.commitment === n ? "border-gold bg-gold text-navy" : ""
                  }`}
                  onClick={() => update("commitment", n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </Step>
        )}

        {!completed && step === 8 && (
          <Step n={8} q="How do you prefer to work?">
            <div className="grid grid-cols-2 gap-3 mb-9 max-md:grid-cols-1">
              {WORK_MODES.map((w) => (
                <button
                  key={w}
                  type="button"
                  className={`${optionBase} ${state.workMode === w ? optionSelected : ""}`}
                  onClick={() => update("workMode", w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </Step>
        )}

        {!completed && step === 9 && (
          <Step n={9} q="How did you find Code 1?">
            <input
              type="text"
              className={inputBase}
              placeholder="Referral, search, social, event..."
              value={state.source}
              onChange={(e) => update("source", e.target.value)}
            />
          </Step>
        )}

        {!completed && step === 10 && (
          <Step n={10} q="What would you like to happen next?">
            <textarea
              className={`${inputBase} min-h-[100px] resize-y leading-[1.6]`}
              placeholder="A conversation, a proposal, more information..."
              value={state.nextStep}
              onChange={(e) => update("nextStep", e.target.value)}
            />
            <input
              type="email"
              className={inputBase}
              placeholder="Your email address"
              value={state.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Step>
        )}

        {completed && (
          <div className="step-in text-center py-10">
            <h3 className="font-serif font-normal text-gold text-[36px] mb-5">
              Thank you.
            </h3>
            <p className="font-sans text-cream/80 text-[17px] leading-[1.7] max-w-[480px] mx-auto">
              Your assessment has been received. Danston or a member of the
              Code 1 team will respond personally within 48 hours.
            </p>
          </div>
        )}

        {!completed && (
          <>
            {errorMessage && (
              <div className="font-sans text-[13px] text-[#f6b8a8] -mt-5 mb-6">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-between items-center gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  disabled={status === "submitting"}
                  className="bg-transparent text-cream/60 border-0 font-sans text-[11px] tracking-[1.5px] uppercase cursor-pointer py-2.5 transition-colors duration-500 ease-smooth hover:text-cream"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={next}
                disabled={!canAdvance() || status === "submitting"}
                className="ml-auto bg-gold text-navy border-0 font-sans text-[12px] font-medium tracking-[1.5px] uppercase px-9 py-4 rounded-full cursor-pointer transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(201,169,97,0.25)] disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              >
                {step === TOTAL_STEPS
                  ? status === "submitting"
                    ? "Submitting…"
                    : "Submit assessment"
                  : "Continue →"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Step({
  n,
  q,
  children,
}: {
  n: number;
  q: string;
  children: React.ReactNode;
}) {
  return (
    <div className="step-in">
      <div className="text-gold text-[11px] tracking-[2px] uppercase mb-4">
        Question {n} of {TOTAL_STEPS}
      </div>
      <div className="font-serif font-normal text-cream text-[28px] leading-[1.3] mb-9">
        {q}
      </div>
      {children}
    </div>
  );
}
