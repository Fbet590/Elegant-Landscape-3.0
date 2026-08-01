"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Check, CheckCircle, Shield, Sparkles, CreditCard, Clock, User, Mail, Phone as PhoneIcon } from "lucide-react"

type StepConfig = {
  question: string
  hint?: string
  type: "radio" | "multi" | "text"
  options?: { label: string }[]
  placeholder?: string
  field?: string
  icon?: string
}

function getSteps(): StepConfig[] {
  return [
    {
      question: "What's your name?",
      hint: "So we know who to ask for",
      type: "text" as const,
      placeholder: "Your full name",
      field: "name",
      icon: "user",
    },
    {
      question: "What's your email address?",
      hint: "We'll send your custom quote here",
      type: "text" as const,
      placeholder: "you@example.com",
      field: "email",
      icon: "mail",
    },
    {
      question: "Best number to reach you?",
      hint: "For a quick follow-up call only",
      type: "text" as const,
      placeholder: "(555) 123-4567",
      field: "phone",
      icon: "phone",
    },
  ]
}

const TEXT_ICONS: Record<string, React.ReactNode> = {
  user: <User className="h-4 w-4 text-muted-foreground/50" />,
  mail: <Mail className="h-4 w-4 text-muted-foreground/50" />,
  phone: <PhoneIcon className="h-4 w-4 text-muted-foreground/50" />,
}

export function HeroSection() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [textInputs, setTextInputs] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const contentRef = useRef<HTMLDivElement>(null)
  const prevStepRef = useRef(step)

  const STEPS = getSteps()

  useEffect(() => {
    const el = contentRef.current
    if (!el || prevStepRef.current === step) return
    prevStepRef.current = step

    el.style.transition = "none"
    el.style.opacity = "0"
    el.style.transform = direction === "forward" ? "translateX(30px)" : "translateX(-30px)"

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 1000ms ease-out, transform 1000ms ease-out"
        el.style.opacity = "1"
        el.style.transform = "translateX(0)"
      })
    })
  }, [step, direction])

  const currentStep = STEPS[step]
  const isLastStep = step === STEPS.length - 1
  const progress = ((step + 1) / STEPS.length) * 100

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function canProceed() {
    if (currentStep.type === "radio") {
      return answers[step] !== undefined
    }
    if (currentStep.type === "multi") {
      const val = answers[step]
      return Array.isArray(val) && val.length > 0
    }
    if (currentStep.type === "text" && currentStep.field) {
      const value = textInputs[currentStep.field].trim()
      if (currentStep.field === "email") {
        return isValidEmail(value)
      }
      return value.length > 0
    }
    return false
  }

  async function handleNext() {
    if (isLastStep) {
      // Build payload from all answers
      const payload = {
        name: textInputs.name,
        email: textInputs.email,
        phone: textInputs.phone,
      }

      // Send to webhook via server-side API route to avoid CORS issues
      try {
        await fetch("/api/submit-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } catch {
        // Still show thank-you even if webhook fails
      }

      // Fire Facebook Pixel Lead event
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Free Quote Request",
          value: 0,
          currency: "USD",
        })
      }

      setSubmitted(true)
      return
    }
    if (canProceed()) {
      setDirection("forward")
      setStep(step + 1)
    }
  }

  function handlePrevious() {
    if (step > 0) {
      setDirection("backward")
      setStep(step - 1)
    }
  }

  function handleRadioSelect(value: string) {
    setAnswers({ ...answers, [step]: value })
    // Auto-advance after a moment so the user sees their selection
    if (!isLastStep) {
      setTimeout(() => {
        setDirection("forward")
        setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
      }, 800)
    }
  }

  function handleMultiSelect(value: string) {
    const current = (answers[step] as string[]) || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    // Clear budget answer (step 1) when project selections change, since options may differ
    const newAnswers = { ...answers, [step]: updated }
    if (step === 0) {
      delete newAnswers[1]
    }
    setAnswers(newAnswers)
  }

  function handleTextChange(value: string) {
    if (currentStep.type === "text" && currentStep.field) {
      setTextInputs({ ...textInputs, [currentStep.field]: value })
      setAnswers({ ...answers, [step]: value })
    }
  }

  if (submitted) {
    return (
      <section id="quote" className="relative min-h-[600px] lg:min-h-[650px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-pergola.png"
            alt="Modern pergola with outdoor kitchen and seating area"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
<div className="absolute inset-0 bg-[#000000]/60" />
        </div>
        <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-24">
          <div className="w-full max-w-md rounded-xl bg-background p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2d5016]">
              <Check className="h-8 w-8 text-[#ffffff]" />
            </div>
            <h2 className="mt-4 font-serif text-2xl text-foreground">Thank You!</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              We&apos;ve received your information and will reach out within 24 hours to discuss your project.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote" className="relative min-h-[600px] lg:min-h-[650px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-pergola.png"
          alt="Modern pergola with outdoor kitchen and seating area"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
        <div className="absolute inset-0 bg-[#000000]/60" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        {/* Left Text */}
        <div className="max-w-xl">
          <h1 className="font-[family-name:var(--font-poppins)] font-bold text-[3.5rem] leading-tight text-[#ffffff] md:text-[4.1rem] lg:text-[5rem] lg:leading-snug text-balance">
            $15.5K. New Turf. New Pavers. <br />
            Done.
          </h1>

          {/* Value Bullets */}
          <ul className="mt-6 flex flex-col gap-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#d4a017]" />
              <span className="text-base font-semibold text-[#ffffff] md:text-lg">
                Full Outdoor Remodeling &mdash; Premium Pavers, Top-Tier Turf - &amp; Other Add-Ons Available
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#d4a017]" />
              <span className="text-base font-semibold text-[#ffffff] md:text-lg">
                Free 3D Design Included
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#d4a017]" />
              <span className="text-base font-semibold text-[#ffffff] md:text-lg">
                12 Months 0% Financing Available
              </span>
            </li>
          </ul>



          <a
            href="#quote"
            className="mt-6 inline-block rounded-md border-2 border-[#ffffff] bg-[#2d5016] px-5 py-2.5 text-[0.87rem] font-extrabold uppercase tracking-wider text-[#ffffff] transition-colors hover:bg-[#234012]"
          >
            Check If My Space Qualifies
          </a>
        </div>

        {/* Right: Multi-step Form */}
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border-[3px] border-[#d4a017] bg-background shadow-[0_25px_80px_-12px_rgba(212,160,23,0.35)] overflow-hidden ring-1 ring-[#d4a017]/20">
            {/* Form headline */}
            <div className="bg-gradient-to-br from-[#2d5016] to-[#1f3a0f] px-5 py-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-center">
                <span className="text-[#d4a017]">Not Every Home Qualifies.</span>{" "}
                <span className="text-[#ffffff]">Yours Might.</span>
              </p>
              <div className="my-3 h-px bg-[#ffffff]/20" />
              <h2 className="text-lg md:text-xl font-bold text-[#ffffff] text-center leading-snug">
                See If You Qualify for Our $15.5K Outdoor Transformation
              </h2>
            </div>

            <div className="px-5 pt-4 pb-5">
              {/* Step dots */}
              <div className="flex items-center gap-1.5 mb-4">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === step
                        ? "w-6 bg-[#2d5016]"
                        : i < step
                          ? "w-3 bg-[#2d5016]/50"
                          : "w-3 bg-muted-foreground/12"
                    }`}
                  />
                ))}
              </div>

              <div ref={contentRef}>
                {/* Question */}
                <h3 className="text-[20px] font-bold text-foreground leading-snug">
                  {currentStep.question}
                </h3>
                {currentStep.hint && (
                  <p className="mt-1 text-[15px] text-muted-foreground/70 leading-snug">
                    {currentStep.hint}
                  </p>
                )}

                {/* Options or Text Input */}
                <div className="mt-4 flex flex-col gap-2">
                  {currentStep.type === "multi" &&
                    currentStep.options?.map((option, idx) => {
                      const selected = Array.isArray(answers[step]) && (answers[step] as string[]).includes(option.label)
                      return (
                        <button
                          key={option.label}
                          onClick={() => handleMultiSelect(option.label)}
                          style={{ animationDelay: `${idx * 50}ms` }}
                          className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[16px] transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-1 ${
                            selected
                              ? "border-[#2d5016] bg-[#2d5016]/10 text-foreground shadow-sm ring-1 ring-[#2d5016]/20"
                              : "border-border bg-background text-foreground hover:border-[#2d5016]/50 hover:bg-[#f8f8f6] hover:shadow-sm"
                          }`}
                        >
                          <div
                            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                              selected
                                ? "border-[#2d5016] bg-[#2d5016] scale-110"
                                : "border-muted-foreground/25 group-hover:border-[#2d5016]/40"
                            }`}
                          >
                            {selected && (
                              <Check className="h-2.5 w-2.5 text-[#ffffff]" />
                            )}
                          </div>
                          <span className="font-medium leading-tight">{option.label}</span>
                        </button>
                      )
                    })}

                  {currentStep.type === "radio" &&
                    currentStep.options?.map((option, idx) => (
                      <button
                        key={option.label}
                        onClick={() => handleRadioSelect(option.label)}
                        style={{ animationDelay: `${idx * 50}ms` }}
                        className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[16px] transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-1 ${
                          answers[step] === option.label
                            ? "border-[#2d5016] bg-[#2d5016]/10 text-foreground shadow-sm ring-1 ring-[#2d5016]/20"
                            : "border-border bg-background text-foreground hover:border-[#2d5016]/50 hover:bg-[#f8f8f6] hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                            answers[step] === option.label
                              ? "border-[#2d5016] bg-[#2d5016] scale-110"
                              : "border-muted-foreground/25 group-hover:border-[#2d5016]/40"
                          }`}
                        >
                          {answers[step] === option.label && (
                            <Check className="h-2.5 w-2.5 text-[#ffffff]" />
                          )}
                        </div>
                        <span className="font-medium leading-tight">{option.label}</span>
                      </button>
                    ))}

                  {currentStep.type === "text" && currentStep.field && (
                    <div className="relative">
                      {currentStep.icon && (
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          {TEXT_ICONS[currentStep.icon]}
                        </div>
                      )}
                      <input
                        type={currentStep.field === "email" ? "email" : currentStep.field === "phone" ? "tel" : "text"}
                        value={textInputs[currentStep.field]}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={currentStep.placeholder}
                        autoFocus
                        className={`w-full rounded-xl border border-border bg-[#fafaf9] py-3.5 text-[16px] text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/40 focus:border-[#2d5016] focus:bg-background focus:ring-2 focus:ring-[#2d5016]/15 ${
                          currentStep.icon ? "pl-10 pr-4" : "px-4"
                        }`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && canProceed()) handleNext()
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={step === 0}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[16px] font-medium transition-all duration-200 ${
                    step === 0
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center gap-1.5 rounded-xl px-6 py-2.5 text-[16px] font-bold uppercase tracking-wider text-[#ffffff] transition-all duration-300 ${
                    canProceed()
                      ? "bg-[#2d5016] hover:bg-[#234012] shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 active:shadow-md"
                      : "bg-[#2d5016]/25 cursor-not-allowed"
                  }`}
                >
                  {isLastStep ? "Check If My Space Qualifies" : "Continue"}
                  {!isLastStep && <ChevronRight className="h-3.5 w-3.5" />}
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Badges */}
      <div className="relative border-t border-[#ffffff]/10 bg-[#000000]/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-3.5">
          <div className="flex items-center gap-2 text-sm text-[#d4d0c8] md:text-base">
            <Shield className="h-5 w-5 text-[#d4a017]" />
            <span>Licensed C-27 #983517</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#d4d0c8] md:text-base">
            <Sparkles className="h-5 w-5 text-[#d4a017]" />
            <span>FREE 3D Design</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#d4d0c8] md:text-base">
            <CreditCard className="h-5 w-5 text-[#d4a017]" />
            <span>0% Down Financing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#d4d0c8] md:text-base">
            <Clock className="h-5 w-5 text-[#d4a017]" />
            <span>Since 2013</span>
          </div>
        </div>
      </div>
    </section>
  )
}
