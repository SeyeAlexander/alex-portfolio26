import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../components/HeroSection'
import { ResumeSection } from '../components/ResumeSection'
import { AboutSection } from '../components/AboutSection'
import { FooterSection } from '../components/FooterSection'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="bg-cream">
      <HeroSection />
      <ResumeSection />
      <AboutSection />
      <FooterSection />
    </div>
  )
}
