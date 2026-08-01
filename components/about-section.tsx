import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const trustPoints = [
  "Clear, Upfront Pricing",
  "Proven Expertise & Stunning Results",
  "Communication You Can Count On",
  "Expert Material Guidance",
  "Permits Handled For You",
  "Professional, Reliable Service",
]

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: Images */}
          <div className="relative flex-1">
            <div className="relative">
              <div className="relative ml-8 overflow-hidden rounded-lg md:ml-16">
                <Image
                  src="/images/experience-hardscape.jpg"
                  alt="Professional hardscape project with 10+ years of experience"
                  width={500}
                  height={380}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-md bg-[#2d5016]/90 px-4 py-3">
                  <p className="text-[34px] font-bold text-[#ffffff] leading-none">10+</p>
                  <p className="mt-0.5 text-[30px] font-semibold text-[#ffffff]/90">Years Experience</p>
                </div>
              </div>

              <div className="absolute -bottom-8 left-0 w-40 overflow-hidden rounded-lg border-4 border-background shadow-lg md:w-52">
                <Image
                  src="/images/hardscape-detail.jpg"
                  alt="Hardscape craftsmanship detail"
                  width={208}
                  height={160}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="mt-8 flex-1 lg:mt-0">
            <p className="text-[14px] font-semibold uppercase tracking-widest text-muted-foreground md:text-xs">
              Choosing a hardscaper doesn&apos;t have to be stressful.
            </p>
            <h2 className="mt-3 font-serif font-extrabold text-[40px] text-foreground md:text-[2.53rem] lg:text-[3.04rem] leading-tight text-balance">
              No more endless searching, hidden costs, or surprise delays.
            </h2>
            <p className="mt-4 text-[18px] text-muted-foreground md:text-sm">
              Here&apos;s why homeowners trust us:
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2d5016]" />
                  <span className="text-[18px] text-foreground md:text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="#quote"
              className="mt-8 inline-block rounded-md bg-[#2d5016] px-7 py-3 text-[16px] font-semibold text-[#ffffff] transition-colors hover:bg-[#234012] md:text-sm"
            >
              Free In-Home Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
