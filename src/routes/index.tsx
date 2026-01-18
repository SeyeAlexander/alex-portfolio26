import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../components/HeroSection'
import { StatsSection } from '../components/StatsSection'
import { AboutSection } from '../components/AboutSection'
import { ResumeSection } from '../components/ResumeSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { FooterSpacer } from '../components/FooterSpacer'
import { FooterSection } from '../components/FooterSection'
import { FloatingNav } from '../components/FloatingNav'
import { SiteLoader } from '../components/SiteLoader'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="bg-black">
      <SiteLoader />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <FooterSpacer />
      <FooterSection />
      <FloatingNav />
    </div>
  )
}
