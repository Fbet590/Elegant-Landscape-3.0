"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const testimonials = [
  {
    name: "S Johnson",
    text: "Brian and his crew did an outstanding job building a new retaining wall in my backyard. He understood the look I was seeking and worked with me to ensure my other suppliers had the information they needed to execute. The quality of the work was outstanding and they were a pleasure to work with on our wall. I'm looking to having them re-pour and design my front stairs and walk. You won't regret working with this company. They earned all five stars!",
  },
  {
    name: "Karen Hanna",
    text: "Brian is pleasant to work with. We had a few issues with communication and getting what we asked for but Brian and his crew made sure it was successfully resolved. We do really like the way it turned and are happy we went with Elegant Landscapes.",
  },
  {
    name: "Vickie Cap",
    text: "Super happy with the backyard renovation by Brian and his team. We have dreamed of doing this for years and we now have the outdoor space we had always hoped for. I am very appreciative how actively involved Brian was from beginning to end. He and his team were excellent with communication, suggestions, etc. Brian's calm demeanor and knowledge set us at ease throughout the process. Thank you so very much for making this huge project go so smoothly.",
  },
  {
    name: "David Manning",
    text: "Loved working with Elegant Landscaping! Brian took care of us all the way through the process and our backyard is now complete!",
  },
  {
    name: "Theodore Cross",
    text: "Brian and his team are amazing. I was concerned about coordinating a landscape company with a pool company and he made it so simple\u2014even when the pool company was not cooperating!! If not for Brian and his family of employees, I would have been a total wreck hoping it all worked out. I'm not sure it would have turned out so well if not for Brian's attention to detail.",
  },
  {
    name: "Mark Benjamin",
    text: "Amazing work by this fine landscape company. Looks like Hawaii in California!",
  },
  {
    name: "Tom Phillips",
    text: "They were extremely accommodating when my neighbors each wanted a different slope treatment on the fence they built for us. They also did a great job on our French drain and our fence turned out looking really nice as well. On top of being accommodating and doing really professional work, everyone on the job was super nice. Our experience was awesome with Elegant Landscaping.",
  },
  {
    name: "Nancy Horton",
    text: "My experience with Elegant Landscaping was fantastic! We had a very long masonry retaining wall, a large amount of pavers for walkways and 2 gorgeous flagstone patios put in. Lighting, drainage and irrigation was installed as well. The crew was knowledgeable and very skilled. They were also nice to work with and very accommodating to our requests. The project exceeded our expectations!",
  },
  {
    name: "Rick Habicht",
    text: "Bryan from Elegant Landscape took on a job that was started by another landscaping company who didn't have the correct license needed by the City of Oceanside. His communication skills and can do attitude turned a frustrating project into a finished project that was done in a timely matter and constructed with skillful tradesmen.",
  },
  {
    name: "Gabe Sanchez",
    text: "Brian and the team were fantastic! They did excellent work. I'd recommend Elegant Landscape to everyone! They're amazing!",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const itemsPerView = 1

  const maxIndex = testimonials.length - itemsPerView

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, goNext])

  return (
    <section id="testimonials" className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-[16.5px] font-semibold uppercase tracking-widest text-[#2d5016] md:text-xs">
            Don&apos;t Just Take Our Word For It...
          </p>
          <h2 className="mt-3 font-serif font-bold text-[35px] text-foreground md:text-3xl lg:text-4xl text-balance">
            Here&apos;s What Our Past Clients Had To Say
          </h2>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="mx-auto max-w-2xl rounded-xl bg-background p-8 shadow-sm border border-border">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                    </div>

                    {/* Name + Google */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d5016] text-sm font-bold text-[#ffffff]">
                          {t.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-foreground">{t.name}</span>
                      </div>
                      <GoogleIcon className="h-6 w-6" />
                    </div>

                    {/* Review */}
                    <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground md:text-sm">
                      {t.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md border border-border text-foreground transition-colors hover:bg-secondary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md border border-border text-foreground transition-colors hover:bg-secondary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#2d5016]" : "w-2 bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
