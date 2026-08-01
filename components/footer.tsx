import Link from "next/link"


export function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img
            src="/images/elegant-landscape-logo.jpg"
            alt="Elegant Landscape Inc."
            className="h-14 w-auto object-contain"
          />

          {/* Copyright */}
          <p className="mt-6 text-[14px] text-[#6b6b6b] md:text-xs">
            &copy; 2025 Elegant Landscape Inc. All Rights Reserved.
          </p>
          <Link href="#" className="mt-1 text-[14px] text-[#6b6b6b] underline hover:text-[#a8b89a] md:text-xs">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
