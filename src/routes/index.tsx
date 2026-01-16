import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../components/HeroSection'
import { ResumeSection } from '../components/ResumeSection'
import { AboutSection } from '../components/AboutSection'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="bg-cream">
      <HeroSection />
      <ResumeSection />
      <AboutSection />
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 py-20 px-[20px] bg-black text-cream flex justify-between items-end">
      <div className="font-korium select-none text-xl md:text-2xl leading-5 tracking-wider text-orange font-extrabold">
        <div>SE</div>
        <div>YE</div>
      </div>
      <div className="font-geist-mono text-xs opacity-50">
        © 2026 Seye Alexander. All rights reserved.
      </div>
    </footer>
  )
}
