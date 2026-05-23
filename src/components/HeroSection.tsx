import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSounds } from '../hooks/useSounds'
import { SoundToggle } from './SoundToggle'
import { ArrowUpRightIcon } from 'lucide-react'
// import { WireframeMesh } from './WireframeMesh'

export function HeroSection() {
  const { playSound } = useSounds()

  return (
    <section
      id="hero"
      className="h-screen min-h-[100dvh] relative overflow-hidden flex flex-col bg-cream"
    >
      {/* Grid Background - hidden on mobile for cleaner look */}
      <GridBackground />

      {/* Topographical Wireframe Mesh - Desktop only */}
      {/* <WireframeMesh className="hidden lg:block inset-0 z-0" /> */}

      {/* Header containing Logo and Nav */}
      <header className="relative z-10 shrink-0 pt-4 px-4 lg:pt-5 lg:px-[20px] flex items-center justify-between">
        <div className="lg:pl-4 lg:w-1/4">
          <Link
            to="/"
            className="inline-block"
            onClick={() => playSound('handgun')}
          >
            <Logo />
          </Link>
        </div>

        {/* Mobile: Simple row layout | Desktop: Absolute positioned */}
        <div className="flex items-center gap-4 lg:hidden">
          <a
            href="#resume"
            onClick={() => playSound('tap')}
            className="font-korium text-lg font-medium tracking-wider text-black"
          >
            Experience
          </a>
          <a
            href="#studio"
            onClick={() => playSound('tap')}
            className="font-korium text-lg font-medium tracking-wider text-black"
          >
            Builds
          </a>
          <SoundToggle />
        </div>

        {/* Desktop Nav - hidden on mobile */}
        <nav className="hidden lg:flex absolute inset-x-0 top-5 pointer-events-none">
          <a
            href="#resume"
            onClick={() => playSound('tap')}
            className="absolute left-[37.5%] -translate-x-1/2 font-korium text-xl lg:text-2xl font-medium tracking-widest text-black transition-transform duration-200 ease-out hover:text-black/60 hover:scale-95 pointer-events-auto"
          >
            Experience
          </a>
          <a
            href="#studio"
            onClick={() => playSound('tap')}
            className="absolute left-[62.5%] -translate-x-1/2 font-korium text-xl lg:text-2xl font-medium tracking-widest text-black transition-transform duration-200 ease-out hover:text-black/60 hover:scale-95 pointer-events-auto"
          >
            Builds
          </a>
          <div className="absolute left-[96.5%] -translate-x-1/2 pointer-events-auto">
            <SoundToggle />
          </div>
        </nav>
      </header>

      {/* Main Content — name + mobile resume; status strip is a section sibling */}
      <main className="flex-1 min-h-0 relative z-10 flex flex-col px-6 lg:px-0 pt-16 md:pt-20 lg:pt-0">
        {/* Desktop: name sits ~50px above the status strip top line (bottom 180px) */}
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center lg:absolute lg:inset-x-0 lg:top-auto lg:bottom-[230px] lg:flex-none lg:justify-center">
          <NameDisplay />
        </div>

        <div className="shrink-0 px-4 pb-8 pt-6 lg:hidden">
          <ResumeButton />
        </div>
      </main>

      {/* Status strip — desktop only, anchored to bottom grid frame */}
      <StatusStrip />
    </section>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none hidden lg:block">
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
      {/* Under ALEXANDER — low, just above the four status cells */}
      <Crosshair className="absolute bottom-[218px] left-[50%]" />
      <Crosshair className="absolute top-[75px] right-[9px]" />

      {/* Lines 2 & 3: Status strip frame (full width, 4 cells) */}
      <div className="absolute bottom-[180px] left-[20px] right-[20px] h-px bg-grid" />
      <div className="absolute bottom-[20px] left-[20px] right-[20px] h-px bg-grid" />

      {/* Crosshairs at every column intersection of the strip frame */}
      <Crosshair className="absolute bottom-[169px] left-[20px]" />
      <Crosshair className="absolute bottom-[169px] left-[25%]" />
      <Crosshair className="absolute bottom-[169px] left-[50%]" />
      <Crosshair className="absolute bottom-[169px] left-[75%]" />
      <Crosshair className="absolute bottom-[169px] right-[9px]" />
      <Crosshair className="absolute bottom-[9px] left-[20px]" />
      <Crosshair className="absolute bottom-[9px] left-[25%]" />
      <Crosshair className="absolute bottom-[9px] left-[50%]" />
      <Crosshair className="absolute bottom-[9px] left-[75%]" />
      <Crosshair className="absolute bottom-[9px] right-[9px]" />
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
    <div className="font-korium select-none text-xl lg:text-2xl leading-5 tracking-wider text-orange hover:text-deep-orange transition-colors duration-300 ease-out font-extrabold">
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

  // Disable parallax on mobile for performance — completes over a shorter scroll span
  const seyeX = useTransform(scrollYProgress, [0, 0.12], [-200, -200])
  const alexanderOffset = useTransform(scrollYProgress, [0, 0.12], [200, 100])

  return (
    <div className="font-korium select-none text-black tracking-wide">
      <div className="relative text-[82px] md:text-9xl lg:text-[180px] xl:text-[200px] md:-ml-36 lg:ml-0 leading-tight font-bold flex flex-col items-center lg:items-start">
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

function ResumeButton({ compact = false }: { compact?: boolean }) {
  const { playSound } = useSounds()

  return (
    <a
      onClick={() => playSound('tap')}
      target="_blank"
      rel="noopener noreferrer"
      href="https://drive.google.com/file/d/1fem6meDrWDGHMQ0nuL5MqodLnUWQ_f9L/view?usp=sharing"
      className={
        compact
          ? 'group bg-deep-orange hover:bg-[#CC3300] cursor-pointer active:scale-[0.99] transition-transform duration-200 ease-out text-white w-full flex items-center rounded-3xl justify-center gap-3 px-4 py-3 min-h-[52px]'
          : 'group bg-deep-orange hover:bg-[#CC3300] cursor-pointer active:scale-[0.99] transition-transform duration-200 ease-out text-white w-full h-full flex items-center rounded-4xl justify-center gap-5 min-h-[56px]'
      }
    >
      <p
        className={
          compact
            ? 'font-geist-mono text-xs uppercase tracking-[0.18em] leading-tight font-medium'
            : 'font-geist-mono text-sm uppercase tracking-[0.2em] leading-tight font-medium'
        }
      >
        Software Engineer
      </p>

      <ArrowUpRightIcon
        className={
          compact
            ? 'w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5'
            : 'w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-1'
        }
      />
    </a>
  )
}

// ---------------------------------------------------------------------------
// StatusStrip — desktop only
//
// Four cells sit inside the bottom grid frame, each aligned to the existing
// vertical grid lines (left-[20px] · 1/4 · 1/2 · 3/4 · right-[20px]). The
// horizontal frame lines + crosshairs are drawn by GridBackground; the cells
// themselves are just absolutely-positioned content boxes.
// ---------------------------------------------------------------------------

type StatusCell = {
  label: string
  dot: string
  title: React.ReactNode
  sub: React.ReactNode
  resumeCta?: boolean
}

const STATUS_CELLS: StatusCell[] = [
  {
    label: 'Now',
    dot: 'bg-green-500',
    title: 'Senior Frontend Engineer',
    sub: 'Layers AI · Remote',
  },
  {
    label: 'Shipping',
    dot: 'bg-orange',
    title: 'Clean & Notes',
    sub: 'Component lab · writing space',
  },
  {
    label: 'Open for',
    dot: 'bg-black/55',
    title: 'Senior FE roles',
    sub: 'Remote-first · contract or full-time',
  },
  {
    label: 'Resume',
    dot: 'bg-deep-orange',
    title: 'Software Engineer',
    sub: 'PDF · updated 2026',
    resumeCta: true,
  },
]

// Each cell maps to one of the four columns defined by the grid lines.
// Using inset values that match the lines exactly keeps everything aligned.
const CELL_INSETS = [
  'left-[20px] right-[75%]',
  'left-[25%] right-[50%]',
  'left-[50%] right-[25%]',
  'left-[75%] right-[20px]',
]

function StatusStrip() {
  return (
    <div className="pointer-events-none hidden lg:block absolute inset-x-0 bottom-0 z-10 h-[180px]">
      {STATUS_CELLS.map((cell, i) => (
        <motion.div
          key={cell.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.7 + i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`pointer-events-auto absolute bottom-[20px] top-auto h-[160px] px-5 py-5 ${CELL_INSETS[i]}`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-block h-2.5 w-2.5 shrink-0 ${cell.dot}`}
                aria-hidden="true"
              />
              <span className="font-geist-mono text-xs uppercase tracking-[0.24em] text-black/55">
                {cell.label}
              </span>
            </div>
            {cell.resumeCta ? (
              <div className="mt-auto pt-4">
                <ResumeButton compact />
              </div>
            ) : (
              <>
                <p className="mt-3 font-geist text-base font-bold text-black leading-tight">
                  {cell.title}
                </p>
                <div className="mt-auto font-geist-mono text-sm leading-5 text-black/55">
                  {cell.sub}
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

