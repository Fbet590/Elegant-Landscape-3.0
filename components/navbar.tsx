"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone, Flame } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "FAQs", href: "#faqs" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Promo strip */}
      <div className="bg-[#2d5016] py-2 px-4">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-[#ffffff] tracking-wide">
          <Flame className="h-4 w-4 text-[#f59e0b]" />
          <span>FREE Fire Pit &amp; Installation For Projects Over $25K</span>
        </p>
      </div>
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border/50 mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5">
        <Link href="/" className="flex items-center">
          <img
            src="/images/elegant-landscape-logo.jpg"
            alt="Elegant Landscape Inc."
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-foreground/70 transition-colors hover:text-[#2d5016]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#quote"
            className="flex items-center gap-1.5 rounded-full bg-[#2d5016] px-5 py-2 text-[13px] font-semibold text-[#ffffff] transition-all hover:bg-[#234012] hover:shadow-md"
          >
            <Phone className="h-3.5 w-3.5" />
            Book Your Free Quote
          </Link>
        </div>

        <button
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/98 backdrop-blur-sm px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-[#2d5016]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#quote"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#2d5016] px-5 py-3 text-[14px] font-semibold text-[#ffffff] transition-colors hover:bg-[#234012]"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="h-4 w-4" />
              Book Your Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
