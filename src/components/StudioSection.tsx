import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useSounds } from '../hooks/useSounds'
import { BuildHeader } from './BuildBlock'

// ---------------------------------------------------------------------------
// StudioSection
//
// Sits directly above ProjectsSection so the two read as one halved section —
// "what I build on my own time." Studio carries the umbrella fronter; the
// Projects section below keeps small per-project subheads so the project
// blocks (Loupe and TextFlow) carry the visual weight.
//
// Cards: cream on black, soft rounded (28px). Picked from a four-variant
// comparison.
// ---------------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

type StudioEntry = {
  to: '/clean' | '/notes'
  number: string
  label: string
  tag: string
  description: string
  meta: string
  Thumb: () => JSX.Element
}

const ENTRIES: StudioEntry[] = [
  {
    to: '/clean',
    number: '01',
    label: 'Clean',
    tag: 'Interface lab',
    description:
      'UI components built in the open. Live preview, source, and the small thinking behind each choice.',
    meta: 'Live · grows over time',
    Thumb: ToolbarThumb,
  },
  {
    to: '/notes',
    number: '02',
    label: 'Notes',
    tag: 'Writing',
    description:
      'Short essays on motion, restraint, sound, and the small craft decisions that decide how a product feels.',
    meta: '004 entries · updated May 22, 2026',
    Thumb: NotesThumb,
  },
]

export function StudioSection() {
  return (
    <section
      id="studio"
      className="relative z-10 bg-black pt-16 md:pt-24 pb-16 md:pb-20"
    >
      {/* Grid lines + top crosshairs — matches ProjectsSection language */}
      <div className="absolute left-[20px] top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute right-[20px] top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute top-0 left-[20px] right-[20px] h-px bg-white/20" />
      {[
        'top-[-5px] left-[20px]',
        'top-[-5px] right-[9px]',
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 -translate-x-1/2 flex items-center justify-center`}
        >
          <div className="absolute w-full h-[1.5px] bg-white" />
          <div className="absolute h-full w-[1.5px] bg-white" />
        </div>
      ))}

      <div className="relative px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Umbrella fronter — frames Studio + the Projects (Loupe + TextFlow) block below */}
        <div className="mb-12 md:mb-16">
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-orange" />
            <span className="font-geist-mono text-xs text-orange uppercase tracking-widest">
              Outside the 9–5
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-korium text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6"
          >
            Built on my own time.
          </motion.h2>
          <p className="max-w-2xl font-geist text-base md:text-lg text-white/65 leading-relaxed">
            Clean is a component lab. Notes is a small writing space. Loupe
            and TextFlow, just below, are the bigger builds. Everything here is
            what I do when no one's paying me to — the things that keep my
            taste sharp between paid work.
          </p>
        </div>

        {/* Build 01 header — "01" on the left, "Clean, Notes" stack pushed
            to the far right, bottom-aligned with the number. */}
        <BuildHeader number="01" numberSide="left">
          <h3 className="self-end text-right font-korium text-6xl md:text-8xl lg:text-[110px] font-bold leading-none text-cream">
            Clean, Notes
          </h3>
        </BuildHeader>

        {/* Cards — full container width, exactly as before. */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 items-stretch">
          {ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.to}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: '-40px' }}
              variants={fadeInUp}
              transition={{ delay: index * 0.08 }}
              className="h-full"
            >
              <StudioCard entry={entry} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StudioCard({ entry }: { entry: StudioEntry }) {
  const { playSound } = useSounds()
  return (
    <Link
      to={entry.to}
      onClick={() => playSound('tap')}
      className="group flex h-full flex-col rounded-[28px] bg-cream text-black overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
    >
      {/* Top row: number + tag */}
      <div className="flex items-center justify-between px-6 pt-6 md:px-8 md:pt-8">
        <span className="font-geist-mono text-xs text-black/45 tracking-widest">
          W/{entry.number}
        </span>
        <span className="font-geist-mono text-[10px] uppercase tracking-[0.26em] text-black/45">
          {entry.tag}
        </span>
      </div>

      {/* Giant title */}
      <h3 className="font-korium text-6xl md:text-7xl font-bold text-black leading-[0.9] px-6 md:px-8 pt-8 md:pt-12">
        {entry.label}
      </h3>

      {/* Preview */}
      <div className="flex h-[220px] items-center justify-center overflow-hidden px-6 pt-10 md:px-8">
        <entry.Thumb />
      </div>

      {/* Footer row: description + arrow */}
      <div className="mt-auto flex items-end justify-between gap-6 border-t border-black/10 px-6 py-5 md:px-8 md:py-6">
        <p className="max-w-xs font-geist-mono text-[12px] leading-6 text-black/70">
          {entry.description}
        </p>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 text-black/70 transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-cream">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Thumbnails
// ---------------------------------------------------------------------------

function ToolbarThumb() {
  const dotIcons = [
    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  ]
  const activeIndex = 2

  return (
    <div className="flex items-center gap-1 px-2 py-2 bg-black/95 border border-white/10 rounded-full shadow-2xl">
      {dotIcons.map((d, i) => (
        <span
          key={i}
          className={
            i === activeIndex
              ? 'relative p-2.5 rounded-full bg-orange text-black'
              : 'relative p-2.5 rounded-full text-white/60'
          }
        >
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
          </svg>
        </span>
      ))}
      <span className="w-px h-5 bg-white/20 mx-0.5" />
      <span className="p-2.5 rounded-full text-orange">
        <svg
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 10v4" />
          <path d="M6 6v12" />
          <path d="M10 3v18" />
          <path d="M14 8v8" />
          <path d="M18 5v14" />
          <path d="M22 10v4" />
        </svg>
      </span>
    </div>
  )
}

function NotesThumb() {
  const lines = [
    { n: '001', t: 'Sound clicks', d: 'Feb 14' },
    { n: '002', t: 'Motion as clarity', d: 'Mar 03' },
    { n: '003', t: 'Minimalism and taste', d: 'Apr 18' },
    { n: '004', t: 'Before shipping', d: 'May 22' },
  ]
  return (
    <div className="w-full max-w-[300px] space-y-2.5">
      {lines.map((entry, i) => {
        const active = i === 3
        return (
          <div
            key={entry.n}
            className={
              active
                ? 'flex items-center justify-between border-b border-black/30 pb-2 text-black'
                : 'flex items-center justify-between border-b border-black/10 pb-2 text-black/40'
            }
          >
            <div className="flex items-baseline gap-3">
              <span className="font-geist-mono text-[10px] uppercase tracking-[0.24em]">
                {entry.n}
              </span>
              <span className="font-geist-mono text-[12px]">{entry.t}</span>
            </div>
            <span className="font-geist-mono text-[10px] tracking-[0.14em]">
              {entry.d}
            </span>
          </div>
        )
      })}
    </div>
  )
}
