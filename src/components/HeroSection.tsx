import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSounds } from '../hooks/useSounds'
import { SoundToggle } from './SoundToggle'
import { ArrowUpRightIcon } from 'lucide-react'

export function HeroSection() {
  const { playSound } = useSounds()

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex flex-col bg-cream"
    >
      {/* Grid Background - hidden on mobile for cleaner look */}
      <GridBackground />

      {/* Header containing Logo and Nav */}
      <header className="relative z-10 pt-4 px-4 md:pt-5 md:px-[20px] flex items-center justify-between">
        <div className="md:pl-4 md:w-1/4">
          <Link
            to="/"
            className="inline-block"
            onClick={() => playSound('handgun')}
          >
            <Logo />
          </Link>
        </div>

        {/* Mobile: Simple row layout | Desktop: Absolute positioned */}
        <div className="flex items-center gap-4 md:hidden">
          <a
            href="#me"
            onClick={() => playSound('tap')}
            className="font-korium text-base font-medium tracking-wider text-black"
          >
            About
          </a>
          <a
            href="#resume"
            onClick={() => playSound('tap')}
            className="font-korium text-base font-medium tracking-wider text-black"
          >
            Resume
          </a>
          <SoundToggle />
        </div>

        {/* Desktop Nav - hidden on mobile */}
        <nav className="hidden md:flex absolute inset-x-0 top-5 pointer-events-none">
          <a
            href="#me"
            onClick={() => playSound('tap')}
            className="absolute left-[37.5%] -translate-x-1/2 font-korium text-xl md:text-2xl font-medium tracking-widest text-black transition-transform duration-200 ease-out hover:text-black/60 hover:scale-95 pointer-events-auto"
          >
            About Me
          </a>
          <a
            href="#resume"
            onClick={() => playSound('tap')}
            className="absolute left-[62.5%] -translate-x-1/2 font-korium text-xl md:text-2xl font-medium tracking-widest text-black transition-transform duration-200 ease-out hover:text-black/60 hover:scale-95 pointer-events-auto"
          >
            Resume
          </a>
          <div className="absolute left-[96.5%] -translate-x-1/2 pointer-events-auto">
            <SoundToggle />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col justify-center px-6 md:px-0 md:pt-64">
        {/* Name Display */}
        <div className="flex items-center justify-center py-16 md:py-0">
          <NameDisplay />
        </div>

        {/* Professional Summary - Below name on mobile, absolute on desktop */}
        <div className="md:absolute md:top-[51%] md:right-3 md:pl-4 md:w-1/4 mt-8 md:mt-0 px-4 md:px-0">
          <ShortSummary />
        </div>

        {/* Button - Full width on mobile, positioned on desktop */}
        <div className="mt-8 md:mt-0 px-4 md:px-0 md:absolute md:bottom-[20px] md:h-14 md:left-[20px] md:right-[75%] z-20">
          <div className="h-14">
            <ResumeButton />
          </div>
        </div>

        {/* Bottom spacing on mobile */}
        <div className="h-8 md:hidden" />
      </main>
    </section>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
      {/* Vertical Lines */}
      <div className="absolute left-[20px] inset-y-0 w-px bg-grid" />
      <div className="absolute left-1/4 inset-y-0 w-px bg-grid" />
      <div className="absolute left-1/2 inset-y-0 w-px bg-grid" />
      <div className="absolute left-3/4 inset-y-0 w-px bg-grid" />
      <div className="absolute right-[20px] inset-y-0 w-px bg-grid" />

      {/* Horizontal Lines */}
      <div className="absolute top-[75px] inset-x-0 h-px bg-grid" />

      {/* Crosshairs for Line 1 */}
      <Crosshair className="absolute top-[75px] left-[20px]" />
      <Crosshair className="absolute top-[64%] left-[50%]" />
      <Crosshair className="absolute top-[75px] right-[9px]" />

      {/* Lines 2 & 3: Info rectangle */}
      <div className="absolute bottom-[75px] left-[20px] right-[75%] h-px bg-grid" />
      <div className="absolute bottom-[20px] left-[20px] right-[75%] h-px bg-grid" />

      {/* Crosshairs for rectangle */}
      <Crosshair className="absolute bottom-[64px] left-[20px]" />
      <Crosshair className="absolute bottom-[64px] left-[25%]" />
      <Crosshair className="absolute bottom-[9px] left-[20px]" />
      <Crosshair className="absolute bottom-[9px] left-[25%]" />
    </div>
  )
}

function Crosshair({ className }: { className?: string }) {
  return (
    <div
      className={`w-3 h-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${className}`}
    >
      <div className="absolute w-full h-[1.5px] bg-black" />
      <div className="absolute h-full w-[1.5px] bg-black" />
    </div>
  )
}

function Logo() {
  return (
    <div className="font-korium select-none text-xl md:text-2xl leading-5 tracking-wider text-orange hover:text-deep-orange transition-colors duration-300 ease-out font-extrabold">
      <motion.div
        initial={{ y: 0, x: 0, rotate: 0 }}
        animate={{
          y: [0, -6, -2, -4, -1, 0],
          x: [0, 3, -2, 1.5, -0.5, 0],
          rotate: [0, 4, -3, 2, -1, 0],
        }}
        transition={{
          duration: 0.7,
          delay: 0.9,
          ease: 'easeOut',
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        SE
      </motion.div>
      <motion.div
        initial={{ y: 8, x: 0, rotate: 0, opacity: 0 }}
        animate={{
          y: [8, -2, 1, -0.5, 0],
          x: [0, -2, 1.5, -0.8, 0],
          rotate: [0, -3, 2, -1, 0],
          opacity: 1,
        }}
        transition={{
          duration: 0.65,
          delay: 0.7,
          ease: 'easeOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        YE
      </motion.div>
    </div>
  )
}

function NameDisplay() {
  const { scrollYProgress } = useScroll()

  // Disable parallax on mobile for performance
  const seyeX = useTransform(scrollYProgress, [0, 0.3], [-200, -200])
  const alexanderOffset = useTransform(scrollYProgress, [0, 0.3], [200, 100])

  return (
    <div className="font-korium select-none text-black tracking-wide">
      <div className="relative text-7xl md:text-8xl lg:text-[200px] leading-tight font-bold flex flex-col items-center md:items-start">
        {/* SEYE */}
        <motion.p
          className="-mb-4 md:-mb-8 lg:-mb-14"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            x:
              typeof window !== 'undefined' && window.innerWidth >= 768
                ? seyeX
                : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
            delay: 0.3,
          }}
        >
          SEYE
        </motion.p>
        {/* ALEXANDER */}
        <motion.p
          style={{
            x:
              typeof window !== 'undefined' && window.innerWidth >= 768
                ? alexanderOffset
                : 0,
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
            delay: 0.1,
          }}
        >
          ALEXANDER
        </motion.p>
      </div>
    </div>
  )
}

function ShortSummary() {
  return (
    <motion.div
      className="font-geist-mono text-xs md:text-sm leading-relaxed text-black/60 max-w-xs text-center md:text-left mx-auto md:mx-0"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.5,
      }}
    >
      <p>
        <span className="text-black font-bold">
          Fullstack Developer at EStation
        </span>{' '}
        architecting high-performance apps. I build{' '}
        <span className="text-black font-bold">collaborative tools</span> at the
        intersection of{' '}
        <span className="text-black font-bold">design and engineering</span>.
        Driven by thoughtful design.
      </p>
    </motion.div>
  )
}

function ResumeButton() {
  const { playSound } = useSounds()

  return (
    <a
      onClick={() => playSound('tap')}
      target="_blank"
      rel="noopener noreferrer"
      href="https://drive.google.com/file/d/1fem6meDrWDGHMQ0nuL5MqodLnUWQ_f9L/view?usp=sharing"
      className="group bg-deep-orange hover:bg-[#CC3300] cursor-pointer active:scale-[0.99] transition-transform duration-200 ease-out text-white w-full h-full flex items-center rounded-4xl justify-center gap-5"
    >
      <p className="font-geist-mono text-sm uppercase tracking-[0.2em] leading-tight font-medium">
        Software Engineer
      </p>

      <ArrowUpRightIcon className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-1" />
    </a>
  )
}
