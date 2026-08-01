"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do you handle necessary permits and regulations?",
    answer:
      "Yes! We handle all permitting and compliance requirements, saving you the stress and time of navigating local zoning and regulations yourself.",
  },
  {
    question: "How long does a typical hardscape project take?",
    answer:
      "While timelines depend on the complexity and scope, most projects are completed within 2-6 weeks. We provide a clear timeline during your initial consultation.",
  },
  {
    question: "Are your projects covered by a warranty or guarantee?",
    answer:
      "Absolutely! We proudly stand behind our craftsmanship with a satisfaction guarantee, ensuring your complete peace of mind.",
  },
  {
    question: "Do you offer financing or payment plan options?",
    answer:
      "Yes, we provide flexible financing solutions to fit various budgets, making it easier to start your dream project sooner.",
  },
]

export function FaqSection() {
  return (
    <section id="faqs" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-serif font-bold text-[35px] text-foreground md:text-3xl lg:text-4xl">
          FAQs
        </h2>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-lg border border-border px-5 mb-4 last:mb-0 last:border-b"
            >
              <AccordionTrigger className="text-[18px] font-semibold text-foreground hover:no-underline md:text-base [&>svg]:text-muted-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] leading-relaxed text-muted-foreground md:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
