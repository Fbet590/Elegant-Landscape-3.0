import { Shield, BadgeCheck, ShieldCheck } from "lucide-react"

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Licensed",
  },
  {
    icon: Shield,
    title: "Bonded",
  },
  {
    icon: ShieldCheck,
    title: "Insured",
  },
]

export function TrustBar() {
  return (
    <section className="bg-background border-t border-border/50 py-4">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-center gap-8 text-[20px] sm:gap-12">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 shrink-0 text-[#2d5016]" />
              <h3 className="text-[18px] font-semibold tracking-wide text-foreground/70">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
