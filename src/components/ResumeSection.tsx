import { motion } from 'framer-motion'

// ============================================================================
// EXPERIENCE DATA (from resume)
// ============================================================================

const experiences = [
  {
    number: '01',
    company: 'Layers AI Inc',
    location: 'Los Angeles, California (Remote)',
    role: 'Senior Frontend Engineer',
    period: 'April 2026 - Present',
    description:
      'Designing and shipping App Machina end-to-end, positioning it as the first Mobile Measurement Agent (MMA) — distinct from legacy mobile measurement platforms.',
    achievements: [
      'Built the full marketing site and a seven-surface authenticated dashboard — attribution funnels, campaigns workbench, audience cohorts — using React 19, TanStack Router, Tailwind v4, Shadcn UI, and Framer Motion.',
      'Made the strategic call to reframe the secondary funnel from generic in-app product analytics into per-network revenue attribution (Meta/TikTok/Google/AppLovin), ensuring the product maintained its MMA positioning.',
      "Partnered with the design lead on a UI modernization of Layers, the company's flagship UGC marketing platform — drove cross-app component standardization and shipped the content calendar redesign alongside adjacent surface updates.",
    ],
  },
  {
    number: '02',
    company: 'EStation',
    location: 'Lagos, Nigeria (Remote)',
    role: 'Senior Full-Stack Developer',
    period: 'June 2025 - March 2026',
    description:
      'Led frontend architecture across product initiatives, from terminal-grade POS systems to multi-tenant e-commerce engines and a JSON-driven headless CMS.',
    achievements: [
      'Built a terminal-grade POS with real-time sync, optimistic UI, and offline-first state management, reducing transaction time by 20%.',
      'Architected a multi-tenant e-commerce engine and a JSON-driven headless CMS that cut content management complexity by 70% by empowering non-technical teams.',
      'Managed coordination and code reviews, mentoring developers on modern patterns: Suspense, optimistic UI, auth flows, and LLM prompt engineering.',
    ],
  },
  {
    number: '03',
    company: 'Neue World',
    location: 'Dubai, UAE (Remote)',
    role: 'Lead Frontend Engineer',
    period: 'July 2024 - May 2025',
    description:
      'Led frontend development of Flozi, an enterprise app, and drove engineering strategy across Layers and Flozi alongside product and design leads.',
    achievements: [
      'Architected a core data-mapping system to sync Notion databases with Webflow CMS, and built a manual editor using Tiptap and ProseMirror.',
      'Contributed backend APIs and third-party integrations for Notion and Webflow.',
      'Partnered with product and design leads to drive engineering strategy for Layers and Flozi, aligning cross-functional stakeholders.',
    ],
  },
  {
    number: '04',
    company: 'Neue World',
    location: 'Dubai, UAE (Remote)',
    role: 'Full-Stack Developer',
    period: 'Feb 2023 - July 2024',
    description:
      'Architected the frontend of Layers, a freelance platform, and championed accessibility and high-fidelity delivery across Webflow client work.',
    achievements: [
      'Integrated a Polygon blockchain layer for secure wallet authentication and contract signing, and built a custom Figma plugin that automated asset transfers.',
      'Championed company-wide accessibility by authoring WCAG technical documentation and integrating standards into engineering workflows.',
      'Accelerated Webflow client delivery (incl. ICCA Dubai) by over 50% via high-fidelity native HTML/CSS/JS animations.',
    ],
  },
]

// Project data for Layers AI
const layersAiProjects = [
  {
    id: 'app-machina',
    title: 'App Machina',
    subtitle: 'Mobile Measurement Agent',
    description:
      'Marketing site + per-network revenue attribution dashboard.',
    variant: 'cream' as const,
    url: 'https://layers-app-machina.vercel.app/',
  },
  {
    id: 'layers-app',
    title: 'Layers',
    subtitle: 'UGC Marketing Platform',
    description:
      'Content calendar redesign and cross-app component standardization.',
    variant: 'white' as const,
    url: 'https://app.layers.com/create-project/54aa1639-9c6a-418b-9a1b-c1c0d3e68aff/start',
  },
]

// Project data for EStation
const estationProjects = [
  {
    id: 'b2c-terminal',
    title: 'B2C Terminal',
    subtitle: 'POS System',
    description: 'Multi-terminal retail management.',
    variant: 'black' as const,
    url: 'http://newb2c-admin-iocl73-894a62-134-209-140-121.traefik.me/login',
  },
  {
    id: 'b2c-ecommerce',
    title: 'B2C Ecommerce',
    subtitle: 'Online Storefront',
    description: 'Full-featured e-commerce platform.',
    variant: 'white' as const,
    url: 'http://newb2c-web-phfnwx-0d6399-134-209-140-121.traefik.me/',
  },
  {
    id: 'e-cms',
    title: 'E-CMS',
    subtitle: 'Headless Content System',
    description: 'JSON-driven field-based CMS for non-technical users.',
    variant: 'white' as const,
    url: 'https://cms.estation.io/login',
  },
  {
    id: 'swift-plan',
    title: 'Swift',
    subtitle: 'Insurance Platform',
    description: 'End-to-end plan management system.',
    variant: 'black' as const,
    url: 'https://free-swift-eiced4-afdee3-134-209-140-121.traefik.me/',
  },
]

// Project data for Neue World
const neueProjects = [
  {
    id: 'flozi',
    title: 'Flozi',
    subtitle: 'Enterprise App',
    description: 'Notion-to-Webflow data mapping system.',
    variant: 'cream' as const,
    url: 'https://app.flozi.io/onboarding/login',
  },
  {
    id: 'layers',
    title: 'Layers',
    subtitle: 'Freelance Platform',
    description: 'Blockchain-integrated wallet authentication.',
    variant: 'white' as const,
    url: 'https://www.neue.world/case-studies/layers',
  },
  {
    id: 'figma-plugin',
    title: 'Layers Plugin',
    subtitle: 'Figma Extension',
    description: 'Automated asset transfer tool.',
    variant: 'cream' as const,
    url: 'https://www.neue.world/case-studies/layers',
  },
  {
    id: 'icca-dubai',
    title: 'ICCA Dubai',
    subtitle: 'Webflow Site',
    description: 'High-fidelity animations and components.',
    variant: 'white' as const,
    url: 'https://www.iccadubai.ae/',
  },
]

// Animation variants - faster for snappier feel
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Sound utility
const playTapSound = () => {
  const audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(
    40,
    audioContext.currentTime + 0.1,
  )

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.1,
  )

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.1)
}

// ============================================================================
// COMPONENTS
// ============================================================================

function SectionHeader() {
  return (
    <div className="relative bg-black py-16 md:py-24">
      {/* Two edge vertical lines */}
      <div className="absolute left-[20px] inset-y-0 w-px bg-white/20" />
      <div className="absolute right-[20px] inset-y-0 w-px bg-white/20" />

      {/* Top horizontal line */}
      <div className="absolute top-0 left-[20px] right-[20px] h-px bg-white/20" />

      {/* Bottom horizontal line */}
      <div className="absolute bottom-0 left-[20px] right-[20px] h-px bg-white/20" />

      {/* Crosshairs - 4 corners (using white for dark bg) */}
      <div className="absolute top-[-5px] left-[20px] w-3 h-3 -translate-x-1/2 flex items-center justify-center">
        <div className="absolute w-full h-[1.5px] bg-white" />
        <div className="absolute h-full w-[1.5px] bg-white" />
      </div>
      <div className="absolute top-[-5px] right-[9px] w-3 h-3 -translate-x-1/2 flex items-center justify-center">
        <div className="absolute w-full h-[1.5px] bg-white" />
        <div className="absolute h-full w-[1.5px] bg-white" />
      </div>
      <div className="absolute bottom-[-5px] left-[20px] w-3 h-3 -translate-x-1/2 flex items-center justify-center">
        <div className="absolute w-full h-[1.5px] bg-white" />
        <div className="absolute h-full w-[1.5px] bg-white" />
      </div>
      <div className="absolute bottom-[-5px] right-[9px] w-3 h-3 -translate-x-1/2 flex items-center justify-center">
        <div className="absolute w-full h-[1.5px] bg-white" />
        <div className="absolute h-full w-[1.5px] bg-white" />
      </div>

      {/* Title */}
      <motion.h2
        className="font-korium text-5xl md:text-[140px] lg:text-[180px] font-bold text-white text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        EXPERIENCE
      </motion.h2>
    </div>
  )
}

interface AnimatedJobNumberProps {
  number: string
  isEven: boolean
}

function AnimatedJobNumber({ number, isEven }: AnimatedJobNumberProps) {
  const is04 = number === '04'
  const colorClass = isEven ? 'text-black' : 'text-deep-orange'

  return (
    <div
      className={`font-geist ${colorClass} text-[100px] md:text-[150px] lg:text-[200px] font-bold leading-none -mt-4 flex`}
    >
      <motion.span
        initial={!is04 ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      >
        0
      </motion.span>
      <motion.span
        initial={
          is04 ? { opacity: 0, rotateY: 90 } : { opacity: 1, rotateY: 0 }
        }
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4,
        }}
        style={{ perspective: 1000 }}
      >
        {number.slice(1)}
      </motion.span>
    </div>
  )
}

interface JobCardProps {
  experience: (typeof experiences)[0]
  index: number
}

function JobCard({ experience, index }: JobCardProps) {
  const isEven = index % 2 === 1 // 0-indexed, so odd index = even card (2nd, 4th)
  const bgClass = isEven ? 'bg-cream text-black' : 'bg-black text-white'
  const borderClass = isEven ? 'border-black/10' : 'border-white/20'

  return (
    <motion.article
      className={`relative ${bgClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-50px' }}
      variants={fadeInUp}
    >
      {/* Main content area */}
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20">
        <div
          className={`flex items-start justify-between ${isEven ? 'flex-row-reverse' : ''}`}
        >
          <AnimatedJobNumber number={experience.number} isEven={isEven} />

          <div className={`max-w-2xl ${isEven ? 'text-left' : 'text-left'}`}>
            <p
              className={`font-geist-mono text-sm tracking-widest uppercase mb-2 ${isEven ? 'text-black/60' : 'text-white/60'}`}
            >
              {experience.number} {experience.company}
            </p>

            <p className="font-geist text-xl md:text-2xl lg:text-3xl leading-snug font-medium mb-8">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-geist-mono text-base">
              <span className="font-bold">{experience.role}</span>
              <span className={isEven ? 'text-black/60' : 'text-white/60'}>
                {experience.period}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${borderClass} my-10 md:my-14`} />

        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {experience.achievements.map((achievement, i) => (
            <div key={i}>
              <h4
                className={`font-geist text-base font-bold mb-2 ${isEven ? 'text-black' : 'text-white'}`}
              >
                Key Achievement {i + 1}
              </h4>
              <p
                className={`font-geist-mono text-sm leading-relaxed ${isEven ? 'text-black/70' : 'text-white/70'}`}
              >
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

interface ProjectCardProps {
  project: {
    id: string
    title: string
    subtitle: string
    description: string
    variant: 'white' | 'cream' | 'black'
    url: string
  }
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const variantStyles = {
    white: 'bg-white text-black border border-black/10',
    cream: 'bg-cream text-black',
    black: 'bg-black text-white',
  }

  const subtitleStyles = {
    white: 'text-black/60',
    cream: 'text-black/60',
    black: 'text-white/60',
  }

  const accentStyles = {
    white: 'text-orange',
    cream: 'text-orange',
    black: 'text-orange',
  }

  const cardNumber = String(index + 1).padStart(2, '0')

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-full flex-col p-6 md:p-8 transition-transform duration-200 hover:scale-[1.02] ${variantStyles[project.variant]}`}
      onClick={() => {
        playTapSound()
      }}
    >
      {/* ASCII-style number */}
      <div className="flex items-start justify-between mb-8">
        <p
          className={`font-geist-mono text-xs ${subtitleStyles[project.variant]}`}
        >
          {project.subtitle}
        </p>
        <span className={`text-lg ${accentStyles[project.variant]}`}>→</span>
      </div>

      {/* Project title with stylized number */}
      <div className="mb-6">
        <p className="font-korium text-3xl md:text-4xl font-bold leading-tight">
          {project.title}
        </p>
        <p
          className={`font-geist-mono text-[40px] md:text-[50px] font-bold leading-none mt-2 ${subtitleStyles[project.variant]}`}
        >
          W/{cardNumber}
        </p>
      </div>

      {/* Description — mt-auto pushes it to the bottom so cards in the
          same row stay the same height regardless of copy length. */}
      <p
        className={`mt-auto font-geist-mono text-xs leading-relaxed ${subtitleStyles[project.variant]}`}
      >
        {project.description}
      </p>
    </a>
  )
}

interface ProjectGridProps {
  projects: typeof estationProjects
  bgClass: string
}

function ProjectGrid({ projects, bgClass }: ProjectGridProps) {
  return (
    <motion.div
      className={`${bgClass} py-8 md:py-12 px-6 md:px-12 lg:px-20`}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-50px' }}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeInUp}
            className="h-full"
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN SECTION
// ============================================================================

export function ResumeSection() {
  return (
    <section id="resume" className="relative z-10">
      <SectionHeader />

      <JobCard experience={experiences[0]} index={0} />

      <ProjectGrid projects={layersAiProjects} bgClass="bg-black" />

      <JobCard experience={experiences[1]} index={1} />

      <ProjectGrid projects={estationProjects} bgClass="bg-cream" />

      <JobCard experience={experiences[2]} index={2} />

      <ProjectGrid projects={neueProjects} bgClass="bg-black" />

      <JobCard experience={experiences[3]} index={3} />
    </section>
  )
}
