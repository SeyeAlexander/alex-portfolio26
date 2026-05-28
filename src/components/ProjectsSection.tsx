import { motion } from 'framer-motion'
import { Github, ChevronLeft, ChevronRight, X, Globe } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import { BuildHeader } from './BuildBlock'
import { BuildsDivider } from './BuildsDivider'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const textflowScreenshots = [
  '/Screenshot 2026-02-04 at 01.51.44.png',
  '/Screenshot 2026-02-04 at 01.51.51.png',
  '/Screenshot 2026-02-04 at 01.52.13.png',
  '/Screenshot 2026-02-04 at 01.52.32.png',
  '/Screenshot 2026-02-04 at 01.52.50.png',
  '/Screenshot 2026-02-04 at 01.52.55.png',
  '/Screenshot 2026-02-04 at 01.53.04.png',
  '/Screenshot 2026-02-04 at 01.53.14.png',
  '/Screenshot 2026-02-04 at 01.53.22.png',
  '/Screenshot 2026-02-04 at 01.57.56.png',
  '/Screenshot 2026-02-04 at 01.58.07.png',
  '/Screenshot 2026-02-04 at 01.58.13.png',
  '/Screenshot 2026-02-04 at 01.58.21.png',
  '/Screenshot 2026-02-04 at 01.58.29.png',
]

const asoScreenshots = [
  '/aso/Screenshot 2026-05-28 at 18.00.40.png',
  '/aso/Screenshot 2026-05-28 at 18.00.47.png',
  '/aso/Screenshot 2026-05-28 at 18.01.03.png',
  '/aso/Screenshot 2026-05-28 at 18.01.11.png',
  '/aso/Screenshot 2026-05-28 at 18.01.19.png',
  '/aso/Screenshot 2026-05-28 at 18.03.34.png',
  '/aso/Screenshot 2026-05-28 at 18.03.43.png',
  '/aso/Screenshot 2026-05-28 at 18.03.49.png',
]

type ModalState = { items: string[]; index: number; alt: string } | null

export function ProjectsSection() {
  const [modal, setModal] = useState<ModalState>(null)

  const goPrev = () =>
    setModal((cur) =>
      cur
        ? {
            ...cur,
            index: cur.index === 0 ? cur.items.length - 1 : cur.index - 1,
          }
        : cur,
    )
  const goNext = () =>
    setModal((cur) =>
      cur ? { ...cur, index: (cur.index + 1) % cur.items.length } : cur,
    )

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    goPrev()
  }
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    goNext()
  }

  // Arrow-key navigation while the modal is open. Bound once when it opens,
  // detached when it closes — uses functional setModal so we don't need to
  // re-bind on every navigation.
  const modalOpen = modal !== null
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  return (
    <section id="projects" className="relative z-10 bg-black py-16 md:py-24">
      {/* Grid lines — bottom only. Top + left + right removed since the
          BuildsDivider strips already provide the visual break above and
          between projects. */}
      <div className="absolute bottom-0 left-[20px] right-[20px] h-px bg-white/20" />

      {/* Bottom corner crosshairs — anchor the remaining horizontal line. */}
      {[
        'bottom-[-5px] left-[20px]',
        'bottom-[-5px] right-[9px]',
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 -translate-x-1/2 flex items-center justify-center`}
        >
          <div className="absolute w-full h-[1.5px] bg-white" />
          <div className="absolute h-full w-[1.5px] bg-white" />
        </div>
      ))}

      {/* -------- Build 02 — Loupe (ASO Audit Agent). Title stack on the
          left, "02" pushed far right at the bottom of the stack. Everything
          below sits at the previous container width, unchanged. -------- */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={fadeInUp}
          className="relative"
        >
          {/* Header row: title stack left, big "02" far right, bottom-aligned */}
          <BuildHeader number="02" numberSide="right">
            <div className="flex flex-col items-start gap-3">
              <h3 className="font-korium text-6xl md:text-8xl lg:text-[110px] font-bold text-cream leading-none">
                Loupe
              </h3>
              <p className="font-geist text-xl md:text-2xl lg:text-3xl text-white/70 leading-tight">
                ASO Audit Agent
              </p>
            </div>
          </BuildHeader>

          {/* Philosophy grid */}
          <div className="mt-12 mb-12 md:mt-16 grid grid-cols-1 gap-px bg-white/12 md:grid-cols-2">
            {[
              {
                title: 'Agent-Led Audit',
                body: 'A Mastra AI agent applies an App Store Optimization methodology skill to score every dimension and write the recommendations.',
              },
              {
                title: 'Guardrails First',
                body: "A deterministic TypeScript engine measures the facts, clamps the agent's scores, recomputes the weighted total, and serves as a full fallback.",
              },
              {
                title: 'Skill-as-Methodology',
                body: 'The 10-dimension ASO rubric lives as a Mastra workspace skill the agent consumes — editable by non-engineers, not buried in code.',
              },
              {
                title: 'Idiomatic Mastra',
                body: 'Tools own external IO, the workflow orchestrates four steps, the agent + skill do the judgment, Zod re-validates the shape.',
              },
            ].map((entry) => (
              <CrosshairPanel key={entry.title}>
                <h4 className="font-geist text-base font-bold text-white mb-1.5">
                  {entry.title}
                </h4>
                <p className="font-geist-mono text-[12px] leading-6 text-white/55">
                  {entry.body}
                </p>
              </CrosshairPanel>
            ))}
          </div>

          {/* Actions */}
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://loupe.seyealexander.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-geist text-sm font-bold text-black transition-colors hover:bg-cream"
            >
              <Globe size={18} />
              Live Demo
            </a>
            <a
              href="https://github.com/SeyeAlexander/aso-audit-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-geist text-sm font-bold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              <Github size={18} />
              View Code
            </a>
          </div>

          {/* Tech stack */}
          <div className="mb-12 flex flex-wrap gap-2">
            {[
              'Mastra',
              'TypeScript',
              'React',
              'Vite',
              'Tailwind CSS',
              'NVIDIA NIM',
              'Llama 3.1 8B',
              'Zod',
              'Express',
              'Firecrawl',
            ].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center border border-white/15 px-3 py-1.5 font-geist-mono text-[11px] text-white/70 transition-colors hover:border-orange/60 hover:text-orange"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Technical features */}
          <div className="grid grid-cols-1 gap-px bg-white/12 md:grid-cols-3">
            {[
              {
                title: 'Agent + Skill',
                body: 'Mastra agent uses the ASO methodology skill as its system prompt — it scores and recommends, not just refines.',
                dot: 'bg-green-500',
              },
              {
                title: 'Deterministic Guardrail',
                body: 'Clamps scores to 0–10, recomputes the weighted /100 in code, Zod-validates, and falls back gracefully.',
                dot: 'bg-orange',
              },
              {
                title: 'Two-Pass Refinement',
                body: 'Parallel scoring + recommendation passes; deterministic before/after survive any agent omission.',
                dot: 'bg-cream',
              },
            ].map((entry) => (
              <CrosshairPanel key={entry.title}>
                <div className="mb-2 flex items-center gap-2">
                  <span className={`inline-block h-1.5 w-1.5 ${entry.dot}`} />
                  <h4 className="font-geist text-sm font-bold text-white">
                    {entry.title}
                  </h4>
                </div>
                <p className="font-geist-mono text-[11px] leading-6 text-white/50">
                  {entry.body}
                </p>
              </CrosshairPanel>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Loupe coverflow */}
      <div className="mt-12 md:mt-16 w-full">
        <CoverflowCarousel
          items={asoScreenshots}
          altPrefix="Loupe screenshot"
          onSelect={(idx) =>
            setModal({ items: asoScreenshots, index: idx, alt: 'Loupe' })
          }
        />
      </div>

      {/* -------- Divider: Loupe → TextFlow (reusing the same crosshair strip
          that sits between Studio and Projects, for visual consistency) -------- */}
      <div className="my-12 md:my-16">
        <BuildsDivider />
      </div>

      {/* -------- Build 03 — TextFlow. "03" on the far left, the title pushed
          to the far right. Content below at full width.
          The relative wrapper carries the left + right vertical grid lines
          that run only along TextFlow's stretch (not Loupe's), so the section
          frames its second build without re-framing the first. -------- */}
      <div className="relative">
      <div className="pointer-events-none absolute left-[20px] inset-y-0 w-px bg-white/20" />
      <div className="pointer-events-none absolute right-[20px] inset-y-0 w-px bg-white/20" />

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={fadeInUp}
          className="relative"
        >
          <BuildHeader number="03" numberSide="left">
            <h3 className="font-korium text-6xl md:text-8xl lg:text-[110px] font-bold text-cream leading-none text-right">
              TextFlow
            </h3>
          </BuildHeader>

          <div className="mt-12 md:mt-16 mb-12 grid grid-cols-1 gap-px bg-white/12 md:grid-cols-2">
            {[
              {
                title: 'Zero to One',
                body: 'Architected completely from the ground up. No boilerplate, just thoughtful engineering from day one.',
              },
              {
                title: 'AI-Driven Design',
                body: 'Interface designed on the fly using LLMs. No Figma files. Rapid, iterative aesthetic layering.',
              },
              {
                title: 'Visuals via Nano Banana',
                body: 'Leveraging Nano Banana for unique, high-fidelity image assets to sell the vision.',
              },
              {
                title: 'System Mastery',
                body: 'Deep integration knowledge: database design, real-time sync, and conflict resolution.',
              },
            ].map((entry) => (
              <CrosshairPanel key={entry.title}>
                <h4 className="font-geist text-base font-bold text-white mb-1.5">
                  {entry.title}
                </h4>
                <p className="font-geist-mono text-[12px] leading-6 text-white/55">
                  {entry.body}
                </p>
              </CrosshairPanel>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://textflow.seyealexander.dev/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-geist text-sm font-bold text-black transition-colors hover:bg-cream"
            >
              <Globe size={18} />
              Live Demo
            </a>
            <a
              href="https://github.com/SeyeAlexander/TextFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-geist text-sm font-bold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              <Github size={18} />
              View Code
            </a>
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            {[
              'Next.js',
              'TypeScript',
              'React',
              'Lexical',
              'Supabase',
              'Drizzle ORM',
              'Yjs (CRDTs)',
              'WebSockets',
            ].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center border border-white/15 px-3 py-1.5 font-geist-mono text-[11px] text-white/70 transition-colors hover:border-orange/60 hover:text-orange"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/12 md:grid-cols-3">
            {[
              {
                title: 'Block-Based Editor',
                body: 'Custom Lexical implementation with rich content blocks',
                dot: 'bg-orange',
              },
              {
                title: 'Real-Time Collaboration',
                body: 'CRDTs for conflict-free sync + live cursor tracking',
                dot: 'bg-deep-orange',
              },
              {
                title: 'PostgreSQL Backend',
                body: 'Supabase + Drizzle ORM for type-safe queries',
                dot: 'bg-cream',
              },
            ].map((entry) => (
              <CrosshairPanel key={entry.title}>
                <div className="mb-2 flex items-center gap-2">
                  <span className={`inline-block h-1.5 w-1.5 ${entry.dot}`} />
                  <h4 className="font-geist text-sm font-bold text-white">
                    {entry.title}
                  </h4>
                </div>
                <p className="font-geist-mono text-[11px] leading-6 text-white/50">
                  {entry.body}
                </p>
              </CrosshairPanel>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TextFlow coverflow */}
      <div className="mt-12 md:mt-16 w-full">
        <CoverflowCarousel
          items={textflowScreenshots}
          altPrefix="TextFlow screenshot"
          onSelect={(idx) =>
            setModal({
              items: textflowScreenshots,
              index: idx,
              alt: 'TextFlow',
            })
          }
        />
      </div>
      </div>{/* /TextFlow framed wrapper */}

      {/* Image Modal — shared by both projects via the `modal` state. */}
      <Dialog.Root
        open={modal !== null}
        onOpenChange={(open) => !open && setModal(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none">
            <div className="relative w-full max-w-5xl flex flex-col items-center">
              <button
                onClick={() => setModal(null)}
                className="absolute -top-12 right-0 md:-right-12 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all border border-white/20"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {modal && (
                <div className="relative w-full aspect-video md:aspect-auto md:max-h-[70vh] flex items-center justify-center bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  <motion.img
                    key={`${modal.alt}-${modal.index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={modal.items[modal.index]}
                    alt={`${modal.alt} screenshot ${modal.index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white hover:text-black text-white border border-white/10 backdrop-blur-md transition-all z-50"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white hover:text-black text-white border border-white/10 backdrop-blur-md transition-all z-50"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {modal && (
                <div className="mt-8 flex gap-3 overflow-x-auto max-w-full pb-2 px-4 scrollbar-hide">
                  {modal.items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setModal((cur) => (cur ? { ...cur, index: idx } : cur))
                      }
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === modal.index
                          ? 'bg-orange w-12'
                          : 'bg-white/20 w-2 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CrosshairPanel
//
// Sharp-edged content panel framed by the site's architectural crosshair
// language: tiny + marks at each corner, 1px hairlines between siblings
// (the parent grid's `gap-px bg-white/12` trick).
// ---------------------------------------------------------------------------

function CrosshairPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-black p-5">
      {[
        '-top-[5px] -left-[5px]',
        '-top-[5px] -right-[5px]',
        '-bottom-[5px] -left-[5px]',
        '-bottom-[5px] -right-[5px]',
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pos} z-10 flex h-2.5 w-2.5 items-center justify-center`}
        >
          <span className="absolute h-px w-full bg-white/55" />
          <span className="absolute h-full w-px bg-white/55" />
        </span>
      ))}
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CoverflowCarousel
//
// Horizontal scroll-snap carousel where the centermost card is largest and
// the neighbors scale + fade based on distance from the viewport centre.
// Accepts `altPrefix` so each project's images get appropriate alt text.
// ---------------------------------------------------------------------------

const CARD_WIDTH = 280
const CARD_GAP = 8

function CoverflowCarousel({
  items,
  onSelect,
  altPrefix,
}: {
  items: string[]
  onSelect: (idx: number) => void
  altPrefix: string
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const initialCenterRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.floor(items.length / 2),
  )

  const scaleFor = (ratio: number) => Math.max(1 - ratio * 0.22, 0.5)
  const opacityFor = (ratio: number) => Math.max(1 - ratio * 0.18, 0.55)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const apply = () => {
      rafIdRef.current = null

      // Use LAYOUT positions (offsetLeft) + scrollLeft to find which card is
      // centered, not getBoundingClientRect — once the cumulative-translate
      // pass runs, rects reflect the transformed positions and subpixel drift
      // makes "nearest" flip between adjacent cards, which left the centered
      // card without the "Click to expand" overlay.
      const scrollCenter = scroller.scrollLeft + scroller.clientWidth / 2

      const ratios: number[] = []
      const signs: number[] = []
      let nearest = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      itemRefs.current.forEach((el, i) => {
        if (!el) {
          ratios[i] = 99
          signs[i] = 0
          return
        }
        const layoutCenter = el.offsetLeft + el.offsetWidth / 2
        const dx = layoutCenter - scrollCenter
        const absDx = Math.abs(dx)
        ratios[i] = absDx / (CARD_WIDTH + CARD_GAP)
        signs[i] = absDx < 8 ? 0 : dx < 0 ? -1 : 1
        if (absDx < nearestDistance) {
          nearestDistance = absDx
          nearest = i
        }
      })

      const translates: number[] = new Array(ratios.length).fill(0)

      let accumRight = 0
      for (let i = nearest + 1; i < ratios.length; i++) {
        const prevScale = i === nearest + 1 ? 1 : scaleFor(ratios[i - 1])
        const myScale = scaleFor(ratios[i])
        const emptySpace =
          (CARD_WIDTH * (1 - prevScale)) / 2 +
          (CARD_WIDTH * (1 - myScale)) / 2
        accumRight += emptySpace
        translates[i] = -accumRight
      }

      let accumLeft = 0
      for (let i = nearest - 1; i >= 0; i--) {
        const prevScale = i === nearest - 1 ? 1 : scaleFor(ratios[i + 1])
        const myScale = scaleFor(ratios[i])
        const emptySpace =
          (CARD_WIDTH * (1 - prevScale)) / 2 +
          (CARD_WIDTH * (1 - myScale)) / 2
        accumLeft += emptySpace
        translates[i] = accumLeft
      }

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const scale = scaleFor(ratios[i])
        const tx = translates[i]
        el.style.transform = `translateX(${tx}px) scale(${scale})`
        el.style.transformOrigin = 'center center'
        el.style.opacity = String(opacityFor(ratios[i]))
      })

      // Functional update — the effect only runs once, so capturing
      // `activeIndex` from closure would go stale after the first state
      // change and silently drop the final correct setState when the
      // browser smooth-scrolls through intermediate positions on mount.
      setActiveIndex((prev) => (prev === nearest ? prev : nearest))
    }

    const schedule = () => {
      if (rafIdRef.current !== null) return
      rafIdRef.current = requestAnimationFrame(apply)
    }

    if (!initialCenterRef.current) {
      const middle = Math.floor(items.length / 2)
      const target = itemRefs.current[middle]
      if (target) {
        const elCenter = target.offsetLeft + target.offsetWidth / 2
        // 'instant' bypasses the CSS scroll-behavior: smooth that Tailwind
        // applies, so the carousel snaps to its centered position on mount
        // instead of animating across all cards.
        scroller.scrollTo({
          left: elCenter - scroller.clientWidth / 2,
          behavior: 'instant' as ScrollBehavior,
        })
        initialCenterRef.current = true
      }
    }

    apply()
    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const scrollToIndex = (idx: number) => {
    const el = itemRefs.current[idx]
    if (!el || !scrollerRef.current) return
    const scroller = scrollerRef.current
    const elCenter = el.offsetLeft + el.offsetWidth / 2
    scroller.scrollTo({
      left: elCenter - scroller.clientWidth / 2,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overflow-y-visible py-10"
        style={{
          gap: `${CARD_GAP}px`,
          paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}px)`,
          paddingRight: `calc(50vw - ${CARD_WIDTH / 2}px)`,
        }}
      >
        {items.map((src, idx) => {
          return (
            <button
              key={`${src}-${idx}`}
              ref={(el) => {
                itemRefs.current[idx] = el
              }}
              type="button"
              onClick={() => {
                if (idx === activeIndex) {
                  onSelect(idx)
                } else {
                  scrollToIndex(idx)
                }
              }}
              className="group/card relative shrink-0 snap-center rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                width: CARD_WIDTH,
                transform: 'translateX(0) scale(1)',
                opacity: 1,
                willChange: 'transform, opacity',
              }}
              aria-label={`${altPrefix} ${idx + 1} — press Enter to expand`}
            >
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <img
                  src={src}
                  alt={`${altPrefix} ${idx + 1}`}
                  className="block h-auto w-full object-cover"
                  draggable={false}
                />
              </div>
              {idx === activeIndex ? (
                <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                  <span className="rounded-full border border-white/20 bg-black/85 px-3 py-1.5 font-geist-mono text-[11px] text-white backdrop-blur">
                    Click to expand
                  </span>
                </div>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Dots */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 px-6">
        {items.map((_, idx) => {
          const active = idx === activeIndex
          return (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to screenshot ${idx + 1}`}
              className={
                active
                  ? 'h-1.5 w-7 rounded-full bg-orange transition-all duration-300'
                  : 'h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40'
              }
            />
          )
        })}
      </div>
    </div>
  )
}
