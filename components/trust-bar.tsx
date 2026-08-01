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
    <section className="bg-[#1a2e0d] py-5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2d5016] md:h-7 md:w-7">
                <item.icon className="h-4.5 w-4.5 text-[#ffffff] md:h-3.5 md:w-3.5" />
              </div>
              <h3 className="text-[16px] font-bold text-[#ffffff] md:text-xs">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
