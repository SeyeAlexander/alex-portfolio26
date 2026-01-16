import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../components/HeroSection'
import { StatsSection } from '../components/StatsSection'
import { AboutSection } from '../components/AboutSection'
import { ResumeSection } from '../components/ResumeSection'
import { FooterSection } from '../components/FooterSection'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="bg-cream">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ResumeSection />
      <FooterSection />
    </div>
  )
}
