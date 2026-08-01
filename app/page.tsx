import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GallerySection } from "@/components/gallery-section"
import { FaqSection } from "@/components/faq-section"
import { TrustBar } from "@/components/trust-bar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TestimonialsSection />
      <GallerySection />
      <FaqSection />
      <TrustBar />
      <Footer />
    </main>
  )
}
