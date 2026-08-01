import Link from "next/link"
import { ArrowRight, CheckCircle2, ClipboardList } from "lucide-react"

export function PricingSection() {
  return (
    <section className="bg-[#f7f3eb] py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c8b97d] bg-[#ffffff] px-3 py-1 text-[16.5px] font-medium text-[#8a7a3b] md:text-sm">
            <ClipboardList className="h-4 w-4" />
            Competitive Pricing
          </span>
          <h2 className="mt-3 font-serif text-[35px] font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            Why Pay More for the Same Quality?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[16px] text-muted-foreground md:text-base">
            Compare our pricing to other San Diego contractors and see the difference.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-4 md:mt-10 md:gap-6 md:grid-cols-2">
          {/* Other Contractors Card */}
          <div className="rounded-xl border border-[#e0daca] bg-[#f0ece3] p-5 md:p-8">
            <p className="text-[18px] font-semibold uppercase tracking-widest text-muted-foreground md:text-sm">
              Other Contractors
            </p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-serif text-[45px] text-[#888888] line-through decoration-2 md:text-6xl">
                $25
              </span>
              <span className="font-serif text-[35px] text-[#888888] md:text-5xl">&ndash;</span>
              <span className="font-serif text-[45px] text-[#888888] line-through decoration-2 md:text-6xl">
                $35
              </span>
              <span className="ml-1 text-base text-muted-foreground md:text-lg">/sq ft</span>
            </div>
            <ul className="mt-5 space-y-2.5 md:mt-6 md:space-y-3">
              {["Demo often extra", "Base prep varies", "Hidden fees common"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[18px] text-muted-foreground md:text-base">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b0a990]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Elegant Landscape Card */}
          <div className="relative rounded-xl border-2 border-[#c8b97d] bg-[#fffdf7] p-5 shadow-lg md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-bold uppercase tracking-widest text-[#2d5016] md:text-sm">
                Elegant Landscape
              </p>
              <span className="rounded-full bg-[#c8a930] px-3 py-0.5 text-[16px] font-bold text-[#ffffff] md:text-sm">
                Best Value
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-serif text-[45px] text-[#2d5016] md:text-6xl">$15.50</span>
              <span className="ml-1 text-base text-muted-foreground md:text-lg">/sq ft</span>
            </div>
            <ul className="mt-5 space-y-2.5 md:mt-6 md:space-y-3">
              {["Demo included", "Professional base prep", "Premium pavers", "Min 1,000 sq ft"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[18px] text-foreground md:text-base">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#c8a930]" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <Link
              href="#quote"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#c8a930] px-5 py-3 text-base font-semibold text-[#ffffff] transition-colors hover:bg-[#b89a28] md:mt-8 md:py-3.5 md:text-lg"
            >
              Get Your Free Quote
              <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="mt-6 text-center text-[16.5px] text-muted-foreground md:mt-8 md:text-base">
          <span className="font-bold text-[#2d5016]">Save up to 50%</span>{" "}
          compared to other contractors — without sacrificing quality.
        </p>
      </div>
    </section>
  )
}
