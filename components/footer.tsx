import Link from "next/link"


export function Footer() {
  return (
    <footer className="bg-[#f7f5f0] border-t border-border/50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <img
            src="/images/elegant-landscape-logo.jpg"
            alt="Elegant Landscape Inc."
            className="h-12 w-auto object-contain opacity-80"
          />

          <div className="flex items-center gap-4">
            <p className="text-[12px] text-foreground/40">
              &copy; 2025 Elegant Landscape Inc. All Rights Reserved.
            </p>
            <span className="text-foreground/20">·</span>
            <Link href="#" className="text-[12px] text-foreground/40 underline underline-offset-2 transition-colors hover:text-foreground/70">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
