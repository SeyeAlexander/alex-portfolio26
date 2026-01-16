import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSounds } from '../hooks/useSounds'
import { SoundToggle } from './SoundToggle'

export function HeroSection() {
  const { playSound } = useSounds()

  return (
    <section className="h-screen relative overflow-hidden flex flex-col bg-cream">
      {/* Grid Background */}
      <GridBackground />

      {/* Header containing Logo and Nav */}
      <header className="relative z-10 pt-4 px-4 md:pt-5 md:px-[20px] flex items-center justify-between">
        <div className="pl-4 w-1/4">
          <Link
            to="/"
            className="inline-block"
            onClick={() => playSound('handgun')}
          >
            <Logo />
          </Link>
        </div>

        {/* Nav Items positioned in middle grid columns */}
        <nav className="absolute inset-x-0 top-4 md:top-5 flex pointer-events-none">
          {/* Me - centered in 2nd column (25%-50%) */}
          <a
            href="#me"
            onClick={() => playSound('tap')}
            className="absolute left-[37.5%] -translate-x-1/2 font-korium text-xl md:text-2xl font-medium tracking-widest text-black transition-transform duration-200 ease-out hover:text-black/60 hover:scale-95 pointer-events-auto"
          >
            Me
          </a>
          {/* Resume - centered in 3rd column (50%-75%) */}
          <a
            href="#resume"
            onClick={() => playSound('tap')}
            className="absolute left-[62.5%] -translate-x-1/2 font-korium text-xl md:text-2xl font-medium tracking-widest text-black transition-transform duration-200 ease-out hover:text-black/60 hover:scale-95 pointer-events-auto"
          >
            Resume
          </a>
          {/* Sound Toggle - in 4th column (75%-100%) */}
          <div className="absolute left-[96.5%] -translate-x-1/2 pointer-events-auto">
            <SoundToggle />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col pt-64">
        {/* Name Display - Staggered */}
        <div className="flex-1 flex items-center justify-center">
          <NameDisplay />
        </div>

        {/* Professional Summary */}
        <div className="absolute top-[51%] right-3 pl-4 w-1/4">
          <ShortSummary />
        </div>

        {/* Info Rectangle */}
        <div className="absolute bottom-[20px] h-14 left-[20px] right-[75%] z-20">
          <InfoRectangle />
        </div>
      </main>
    </section>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
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
      {/* SE - gets knocked up by YE, wobbles, then settles */}
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
      {/* YE - rises up to knock SE, wobbles opposite direction */}
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
  // Track scroll progress - complete by 30% scroll
  const { scrollYProgress } = useScroll()

  // Both names use pixel-based transforms that Framer Motion can smoothly interpolate
  // SEYE: starts 80px left of its natural position, moves right to center
  // ALEXANDER: starts offset right (200px), animates to 0 (centered)
  const seyeX = useTransform(scrollYProgress, [0, 0.3], [-200, -200])
  const alexanderOffset = useTransform(scrollYProgress, [0, 0.3], [200, 100])

  return (
    <div className="font-korium select-none text-black tracking-wide">
      <div className="relative text-5xl md:text-8xl lg:text-[200px] leading-tight font-bold flex flex-col items-start">
        {/* SEYE - fades in from top second, moves RIGHT to center on scroll */}
        <motion.p
          className="-mb-8 lg:-mb-14"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ x: seyeX }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
            delay: 0.3,
          }}
        >
          SEYE
        </motion.p>
        {/* ALEXANDER - fades in from top first, moves LEFT to center on scroll */}
        <motion.p
          style={{ x: alexanderOffset }}
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
      className="font-geist-mono text-xs md:text-sm leading-relaxed text-black/60 max-w-xs"
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

function InfoRectangle() {
  return (
    <div className="bg-deep-orange text-white w-full h-full flex items-center justify-center gap-10">
      <div className="font-korium text-2xl md:text-5xl font-bold">S</div>
      <div className="font-geist-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-tight font-medium">
        Software Engineer
      </div>
    </div>
  )
}
