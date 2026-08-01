"use client"

import Image from "next/image"
import { useState, useCallback, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const services = [
  {
    title: "Driveways & Walkways",
    description:
      "Enhance your home's curb appeal with beautifully crafted driveways and walkways built to last.",
    image: "/images/service-driveways.jpg",
  },
  {
    title: "Patios, Porches & Terraces",
    description:
      "Create inviting outdoor spaces perfect for relaxation, entertaining, and making unforgettable memories.",
    image: "/images/service-patios.jpg",
  },

  {
    title: "Artificial Turf Installation",
    description:
      "Transform your yard into a stunning, customized landscape designed and installed to enhance your home's beauty and value.",
    image: "/images/service-turf.jpg",
  },
  {
    title: "Fire & Water Features",
    description:
      "Protect your property and enhance its beauty with durable retaining walls that provide essential support and structure.",
    image: "/images/service-fire-water.jpg",
  },
  {
    title: "Complete Outdoor Transformations",
    description:
      "Reimagine your outdoor space with transformations designed to elevate beauty, functionality, and property value.",
    image: "/images/service-outdoor.jpg",
  },
]

export function ServicesSection() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, services.length - visibleCount)

  const goNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((prev) => Math.min(prev + 1, maxIndex))
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning, maxIndex])

  const goPrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((prev) => Math.max(prev - 1, 0))
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning])

  const cardWidthPercent = 100 / visibleCount

  return (
    <section id="services" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-[16.5px] font-semibold uppercase tracking-widest text-[#2d5016] md:text-xs">
            Ready to Reimagine Your Outdoor Living Space?
          </p>
          <h2 className="mt-3 font-serif font-bold text-[35px] text-foreground md:text-3xl lg:text-4xl text-balance">
            Our Expert Hardscape Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-sm">
            Our expert team is ready to handle projects of all sizes and
            complexities; always ensuring meticulous craftsmanship, clear
            communication, and results that exceed your expectations.
          </p>
          <a
            href="#quote"
            className="mt-6 inline-block rounded-md bg-[#2d5016] px-7 py-3 text-[16px] font-semibold text-[#ffffff] transition-colors hover:bg-[#234012] md:text-sm"
          >
            Get A Free Quote
          </a>
        </div>

        {/* Carousel */}
        <div className="relative mt-14">
          {/* Arrows */}
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="absolute -left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-lg transition-all hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed lg:-left-6"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <button
            onClick={goNext}
            disabled={current === maxIndex}
            className="absolute -right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-lg transition-all hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed lg:-right-6"
            aria-label="Next service"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Track */}
          <div className="overflow-hidden rounded-xl">
            <div
              ref={trackRef}
              className="flex transition-transform duration-400 ease-in-out"
              style={{
                transform: `translateX(-${current * cardWidthPercent}%)`,
              }}
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md h-full">
                    <div className="overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={500}
                        height={320}
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-[18px] text-foreground md:text-lg">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground md:text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-7 bg-[#2d5016]"
                    : "w-2.5 bg-[#2d5016]/25 hover:bg-[#2d5016]/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
