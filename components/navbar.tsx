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
      <nav className="bg-background border-b border-border mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <img
            src="/images/elegant-landscape-logo.jpg"
            alt="Elegant Landscape Inc."
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-[#2d5016]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#quote"
            className="flex items-center gap-2 rounded-md bg-[#2d5016] px-5 py-2.5 text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#234012]"
          >
            <Phone className="h-4 w-4" />
            Book Your Free Quote
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-[#2d5016]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#quote"
              className="flex items-center justify-center gap-2 rounded-md bg-[#2d5016] px-5 py-2.5 text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#234012]"
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
