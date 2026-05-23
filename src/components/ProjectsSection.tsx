import { motion } from 'framer-motion'
import { Github, ChevronLeft, ChevronRight, X, Globe } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'

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

const screenshots = [
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

export function ProjectsSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )
  // const marqueeControls = useAnimationControls()

  // Start marquee animation
  // const startMarquee = () => {
  //   marqueeControls.start({
  //     x: '-50%',
  //     transition: {
  //       duration: 40,
  //       ease: 'linear',
  //       repeat: Infinity,
  //     },
  //   })
  // }

  // Handle modal navigation
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? screenshots.length - 1 : (prev as number) - 1,
      )
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === screenshots.length - 1 ? 0 : (prev as number) + 1,
      )
    }
  }

  return (
    <section id="projects" className="relative z-10 bg-black py-16 md:py-24">
      {/* Grid lines */}
      <div className="absolute left-[20px] inset-y-0 w-px bg-white/20" />
      <div className="absolute right-[20px] inset-y-0 w-px bg-white/20" />
      <div className="absolute top-0 left-[20px] right-[20px] h-px bg-white/20" />
      <div className="absolute bottom-0 left-[20px] right-[20px] h-px bg-white/20" />

      {/* Crosshairs */}
      {[
        'top-[-5px] left-[20px]',
        'top-[-5px] right-[9px]',
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

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Subheader — Studio above already carries the umbrella fronter,
            so we keep this small and let TextFlow's card carry the weight. */}
        <div className="mb-8 md:mb-10 flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange/80" />
          <span className="font-geist-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
            Featured Build · Currently in the forge
          </span>
        </div>

        {/* TextFlow block — no outer rounded container. Content sits on
            the section's bg and inner panels carry the architectural
            crosshair language. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={fadeInUp}
          className="relative"
        >
          {/* Top row: status pill */}
          <div className="mb-8 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/8 px-3 py-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="font-geist-mono text-[10px] uppercase tracking-[0.26em] text-green-500">
                Live
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-korium text-6xl md:text-8xl lg:text-[110px] font-bold text-cream leading-none mb-10">
            TextFlow
          </h3>

          {/* Philosophy grid — sharp crosshair panels */}
          <div className="mb-12 grid grid-cols-1 gap-px bg-white/12 md:grid-cols-2">
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

          {/* Actions */}
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

          {/* Tech stack — square (not rounded) sharp pills with thin border */}
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

          {/* Technical features — sharp crosshair panels */}
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
                  <span
                    className={`inline-block h-1.5 w-1.5 ${entry.dot}`}
                  />
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

      <div className="mt-12 md:mt-16 w-full">
        <CoverflowCarousel
          items={screenshots}
          onSelect={(idx) => setSelectedImageIndex(idx)}
        />
      </div>

      {/* Image Modal */}
      <Dialog.Root
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && setSelectedImageIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none">
            <div className="relative w-full max-w-5xl flex flex-col items-center">
              {/* Close Button - more prominent */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-12 right-0 md:-right-12 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all border border-white/20"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Main Image */}
              {selectedImageIndex !== null && (
                <div className="relative w-full aspect-video md:aspect-auto md:max-h-[70vh] flex items-center justify-center bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={screenshots[selectedImageIndex]}
                    alt="Screenshot Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Navigation Controls */}
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

              {/* Thumbnails */}
              <div className="mt-8 flex gap-3 overflow-x-auto max-w-full pb-2 px-4 scrollbar-hide">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === selectedImageIndex
                        ? 'bg-orange w-12'
                        : 'bg-white/20 w-2 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
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
// (provided by the parent grid's `gap-px bg-white/12` trick). Lives inside
// the TextFlow card to keep the visual language consistent with Stats,
// Resume, and the Studio section above.
// ---------------------------------------------------------------------------

function CrosshairPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-black p-5">
      {/* Crosshair marks at each corner */}
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
// the neighbors scale down progressively based on distance from the viewport
// center. Replaces the previous infinite marquee — gives focus instead of
// constant ambient motion.
// ---------------------------------------------------------------------------

const CARD_WIDTH = 280
const CARD_GAP = 8

function CoverflowCarousel({
  items,
  onSelect,
}: {
  items: string[]
  onSelect: (idx: number) => void
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const initialCenterRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(items.length / 2))

  // Compute scale from absolute distance ratio (0 = centre, ±1 = one card
  // away, ±2 = two away, ...). Smoothly decays, floored so far cards still
  // hint at being there.
  const scaleFor = (ratio: number) => Math.max(1 - ratio * 0.22, 0.5)
  // Opacity decays similarly, less aggressive than scale.
  const opacityFor = (ratio: number) => Math.max(1 - ratio * 0.18, 0.55)

  // Layout pass. Writes transforms directly to DOM (refs) inside rAF — no
  // React state per scroll event, which removes the per-frame re-render
  // jitter that was visible when cards passed through the centre.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const apply = () => {
      rafIdRef.current = null
      const rect = scroller.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2

      // First pass: collect each item's ratio and signed direction.
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
        const r = el.getBoundingClientRect()
        const itemCenter = r.left + r.width / 2
        const dx = itemCenter - centerX
        const absDx = Math.abs(dx)
        ratios[i] = absDx / (CARD_WIDTH + CARD_GAP)
        signs[i] = absDx < 8 ? 0 : dx < 0 ? -1 : 1
        if (absDx < nearestDistance) {
          nearestDistance = absDx
          nearest = i
        }
      })

      // Second pass: compute cumulative translateX so visual gaps stay
      // uniform. Each scaled card leaves W*(1-scale) of empty layout space;
      // half goes on each side. To close that gap we translate the card
      // toward centre by the cumulative empty space between it and the
      // nearest card on the centre-side.
      const translates: number[] = new Array(ratios.length).fill(0)

      // Walk right from the active index.
      let accumRight = 0
      for (let i = nearest + 1; i < ratios.length; i++) {
        const prevScale = i === nearest + 1 ? 1 : scaleFor(ratios[i - 1])
        const myScale = scaleFor(ratios[i])
        // Empty space between i-1 and i = right half of i-1 + left half of i
        const emptySpace =
          (CARD_WIDTH * (1 - prevScale)) / 2 + (CARD_WIDTH * (1 - myScale)) / 2
        accumRight += emptySpace
        translates[i] = -accumRight
      }

      // Walk left from the active index.
      let accumLeft = 0
      for (let i = nearest - 1; i >= 0; i--) {
        const prevScale = i === nearest - 1 ? 1 : scaleFor(ratios[i + 1])
        const myScale = scaleFor(ratios[i])
        const emptySpace =
          (CARD_WIDTH * (1 - prevScale)) / 2 + (CARD_WIDTH * (1 - myScale)) / 2
        accumLeft += emptySpace
        translates[i] = accumLeft
      }

      // Third pass: write final transforms straight to the DOM.
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const scale = scaleFor(ratios[i])
        const tx = translates[i]
        el.style.transform = `translateX(${tx}px) scale(${scale})`
        // Keep transform-origin centred — we're now translating manually,
        // origin doesn't need to do the work.
        el.style.transformOrigin = 'center center'
        el.style.opacity = String(opacityFor(ratios[i]))
      })

      if (nearest !== activeIndex) setActiveIndex(nearest)
    }

    const schedule = () => {
      if (rafIdRef.current !== null) return
      rafIdRef.current = requestAnimationFrame(apply)
    }

    // Initial center jump (auto, not smooth) so we open already centred.
    if (!initialCenterRef.current) {
      const middle = Math.floor(items.length / 2)
      const target = itemRefs.current[middle]
      if (target) {
        const elCenter = target.offsetLeft + target.offsetWidth / 2
        scroller.scrollTo({
          left: elCenter - scroller.clientWidth / 2,
          behavior: 'auto',
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
      {/* Scroll track. The horizontal padding equals (50vw - half a card
          width) so the first and last cards can land at the visual centre
          when snapped. */}
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
              className="group/card relative shrink-0 snap-center"
              style={{
                width: CARD_WIDTH,
                // Initial transform — the rAF handler will overwrite this on
                // first paint. No CSS transition so scroll-driven transforms
                // follow the scroll position without lagging or jittering.
                transform: 'translateX(0) scale(1)',
                opacity: 1,
                willChange: 'transform, opacity',
              }}
              aria-label={`TextFlow screenshot ${idx + 1}`}
            >
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <img
                  src={src}
                  alt={`TextFlow Screenshot ${idx + 1}`}
                  className="block h-auto w-full object-cover"
                  draggable={false}
                />
              </div>
              {/* View overlay only on the centered card */}
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
