"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Outdoor kitchen with stone tile countertop" },
  { src: "/images/gallery-2.jpg", alt: "Free-standing pergola by the pool" },
  { src: "/images/gallery-3.jpg", alt: "Stone block stairway with landscaping" },
  { src: "/images/gallery-4.jpg", alt: "Flagstone walkway to front entrance" },
  { src: "/images/gallery-5.jpg", alt: "Artificial turf soccer field" },
  { src: "/images/gallery-6.jpg", alt: "Stone veneer patio cover with outdoor kitchen" },
  { src: "/images/gallery-7.jpg", alt: "Modern deck with patio cover and cable railing" },
  { src: "/images/gallery-8.jpg", alt: "Painted pergola with railing" },
  { src: "/images/gallery-9.jpg", alt: "Composite deck with dining area and view" },
  { src: "/images/gallery-10.jpg", alt: "Fire pit lounge with artificial turf" },
  { src: "/images/gallery-11.jpg", alt: "Dark metal pergola over hot tub" },
  { src: "/images/gallery-12.jpg", alt: "Louvered patio cover at dusk" },
  { src: "/images/gallery-13.jpg", alt: "Pool with artificial turf and stepping stones" },
  { src: "/images/gallery-14.jpg", alt: "Pergola with privacy wall and pavers" },
]

export function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % galleryImages.length)
  }, [])

  // Auto-scroll every 10 seconds (pause when lightbox is open)
  useEffect(() => {
    if (lightboxIndex !== null) return
    const interval = setInterval(goNext, 10000)
    return () => clearInterval(interval)
  }, [goNext, lightboxIndex])

  // Manage body overflow and keyboard events when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden"
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxIndex(null)
        if (e.key === "ArrowRight") setLightboxIndex((prev) => prev !== null ? (prev + 1) % galleryImages.length : null)
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null)
      }
      window.addEventListener("keydown", handleKey)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKey)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [lightboxIndex])

  function openLightbox(index: number) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function lightboxNext() {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length)
    }
  }

  function lightboxPrev() {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <section id="gallery" className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-[16.5px] font-semibold uppercase tracking-widest text-[#2d5016] md:text-xs">
            See Our Stunning Results
          </p>
          <h2 className="mt-3 font-serif font-bold text-[35px] text-foreground md:text-3xl lg:text-4xl text-balance">
            Explore Our Recent Transformations
          </h2>
          <p className="mt-3 text-[16px] text-muted-foreground md:text-sm">
            Imagine the possibilities for your own yard
          </p>
        </div>

        {/* Slideshow */}
        <div className="relative mt-12 mx-auto max-w-5xl">
          <button
            onClick={() => openLightbox(current)}
            className="relative block w-full overflow-hidden rounded-2xl shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2d5016] focus:ring-offset-2"
            aria-label="Open image in lightbox"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={galleryImages[current].src}
              alt={galleryImages[current].alt}
              className="aspect-[16/9] w-full object-cover rounded-2xl animate-in fade-in-0 duration-700"
            />
          </button>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-[#2d5016]"
                    : "w-2 bg-[#2d5016]/20 hover:bg-[#2d5016]/40"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/10 text-[#ffffff] transition-colors hover:bg-[#ffffff]/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              lightboxPrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffffff]/10 text-[#ffffff] transition-colors hover:bg-[#ffffff]/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              lightboxNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffffff]/10 text-[#ffffff] transition-colors hover:bg-[#ffffff]/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-5xl w-full"
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              width={1400}
              height={900}
              className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#000000]/60 px-4 py-1.5 text-xs text-[#ffffff]">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
