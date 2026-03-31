import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { CleanLayout } from '@/components/clean/CleanLayout'
import { ToolbarShowcase } from '@/components/clean/ToolbarShowcase'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/clean')({
  head: () => ({
    meta: [
      { title: 'Clean | Seye Alexander' },
      {
        name: 'description',
        content:
          'Clean is Seye Alexander’s interaction lab for micro components, motion studies, and public UI explorations.',
      },
    ],
  }),
  component: CleanPage,
})

function CleanPage() {
  const [activeItem, setActiveItem] = useState('toolbar')
  const [hasOverflow, setHasOverflow] = useState(false)
  const [scrubProgress, setScrubProgress] = useState(0)
  const scrubberTrackRef = useRef<HTMLDivElement | null>(null)
  const stickyWrapRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const selectedComponent =
    COMPONENTS.find((item) => item.id === activeItem) ?? COMPONENTS[0]

  useEffect(() => {
    const measureOverflow = () => {
      const itemElements = COMPONENTS.map((item) => itemRefs.current[item.id]).filter(
        Boolean,
      ) as HTMLButtonElement[]

      if (itemElements.length < 2) {
        setHasOverflow(false)
        setScrubProgress(0)
        return
      }

      const firstTop = itemElements[0].offsetTop
      const last = itemElements[itemElements.length - 1]
      const lastBottom = last.offsetTop + last.offsetHeight
      const availableRange = lastBottom - firstTop
      const viewportAllowance = Math.max(window.innerHeight * 0.72, 520)
      const nextHasOverflow = availableRange > viewportAllowance
      setHasOverflow(nextHasOverflow)

      if (!nextHasOverflow) {
        setScrubProgress(0)
        return
      }

      const maxScroll = Math.max(lastBottom - window.innerHeight + 120, firstTop)
      const nextProgress =
        maxScroll > firstTop
          ? (window.scrollY - firstTop) / (maxScroll - firstTop)
          : 0
      setScrubProgress(Math.min(Math.max(nextProgress, 0), 1))
    }

    measureOverflow()

    const resizeObserver = new ResizeObserver(measureOverflow)
    COMPONENTS.forEach((item) => {
      const element = itemRefs.current[item.id]
      if (element) resizeObserver.observe(element)
    })
    window.addEventListener('resize', measureOverflow)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', measureOverflow)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const entries = COMPONENTS.map((item) => ({
        id: item.id,
        element: itemRefs.current[item.id],
      })).filter(
        (entry): entry is { id: string; element: HTMLButtonElement } =>
          Boolean(entry.element),
      )

      if (entries.length < 2) return

      const firstTop = entries[0].element.offsetTop
      const last = entries[entries.length - 1].element
      const lastBottom = last.offsetTop + last.offsetHeight
      const maxScroll = Math.max(lastBottom - window.innerHeight + 120, firstTop)
      const nextProgress =
        maxScroll > firstTop
          ? (window.scrollY - firstTop) / (maxScroll - firstTop)
          : 0
      setScrubProgress(Math.min(Math.max(nextProgress, 0), 1))

      let nearestId = activeItem
      let nearestDistance = Number.POSITIVE_INFINITY
      const viewportMiddle = window.innerHeight * 0.42

      entries.forEach((entry) => {
        const rect = entry.element.getBoundingClientRect()
        const distance = Math.abs(rect.top - viewportMiddle)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestId = entry.id
        }
      })

      if (nearestId !== activeItem) {
        setActiveItem(nearestId)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeItem])

  const scrollToItem = (id: string) => {
    setActiveItem(id)
    const target = itemRefs.current[id]
    if (!target) return

    const nextTop = target.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({
      top: nextTop,
      behavior: 'smooth',
    })
  }

  const updateScrollFromPointer = (clientX: number) => {
    const track = scrubberTrackRef.current
    const itemElements = COMPONENTS.map((item) => itemRefs.current[item.id]).filter(
      Boolean,
    ) as HTMLButtonElement[]
    if (!track || !hasOverflow || itemElements.length < 2) return

    const rect = track.getBoundingClientRect()
    const nextRatio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    const firstTop = itemElements[0].offsetTop
    const last = itemElements[itemElements.length - 1]
    const lastBottom = last.offsetTop + last.offsetHeight
    const maxScroll = Math.max(lastBottom - window.innerHeight + 120, firstTop)
    const nextTop = firstTop + nextRatio * Math.max(maxScroll - firstTop, 0)

    window.scrollTo({
      top: nextTop,
      behavior: 'auto',
    })
  }

  const beginScrub = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    updateScrollFromPointer(event.clientX)

    const handlePointerMove = (moveEvent: PointerEvent) => {
      updateScrollFromPointer(moveEvent.clientX)
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  return (
    <CleanLayout active="clean" title="clean">
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <p className="shrink-0 font-geist-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
            Clean Components
          </p>
        </div>
        <h2 className="max-w-2xl text-2xl font-medium leading-[1.18] tracking-[-0.03em]">
          A small place for interface details I want to keep building in public.
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-black/62 dark:text-white/62">
          Intentionally quiet. One component at a time, stacked vertically, with
          enough context to show how I think about motion, feel, and frontend
          craft.
        </p>
      </section>

      {hasOverflow ? (
        <div
          ref={stickyWrapRef}
          className="sticky top-6 z-30 mb-8 hidden justify-end lg:flex"
          aria-hidden="true"
        >
          <div
            ref={scrubberTrackRef}
            onPointerDown={beginScrub}
            className="flex h-9 w-[128px] cursor-ew-resize items-center rounded-full border border-black/8 bg-white/35 px-3 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/20 dark:border-white/10 dark:bg-black/28 dark:shadow-[0_14px_34px_rgba(0,0,0,0.22)] dark:supports-[backdrop-filter]:bg-black/22"
          >
            <div className="relative flex w-full items-center justify-between">
              <motion.span
                className="absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-full bg-orange/12"
                animate={{ width: `${Math.max(scrubProgress * 100, 10)}%` }}
                transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.5 }}
              />
              {COMPONENTS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    scrollToItem(item.id)
                  }}
                  className="relative z-10 flex h-4 w-4 items-center justify-center"
                  aria-label={`Jump to ${item.title}`}
                >
                  <span
                    className={cn(
                      'block rounded-full transition-all duration-200',
                      activeItem === item.id
                        ? 'h-2 w-2 bg-orange'
                        : index / (COMPONENTS.length - 1 || 1) <= scrubProgress
                          ? 'h-1.5 w-1.5 bg-orange/70'
                          : 'h-1.5 w-1.5 bg-black/18 dark:bg-white/22',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <section className="space-y-8">
        <div className="grid gap-20">
          {COMPONENTS.map((item) => {
            const selected = activeItem === item.id
            return (
              <button
                key={item.id}
                ref={(element) => {
                  itemRefs.current[item.id] = element
                }}
                type="button"
                onClick={() => scrollToItem(item.id)}
                className="text-left"
              >
                <article className="space-y-4">
                  <div
                    className="flex min-h-[420px] items-center justify-center rounded-[30px] border p-8 transition-transform"
                    style={{
                      borderColor: selected
                        ? 'rgba(255,255,255,0.18)'
                        : 'rgba(128,128,128,0.16)',
                      backgroundColor: item.previewTone,
                    }}
                  >
                    {item.id === 'toolbar' ? (
                      <div className="w-full max-w-[700px]">
                        <ToolbarShowcase />
                      </div>
                    ) : (
                      <div className="w-full max-w-[700px] rounded-[24px] border border-dashed border-black/10 p-10 text-center text-sm text-black/45 dark:border-white/12 dark:text-white/45">
                        {item.placeholder}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-lg font-medium tracking-[-0.03em]">
                      {item.title}
                    </p>
                    <p className="text-sm text-black/45 dark:text-white/45">
                      {item.tag}
                    </p>
                  </div>
                </article>
              </button>
            )
          })}
        </div>

        <div className="max-w-2xl space-y-4 border-t border-black/10 pt-8 text-[14px] leading-7 text-black/62 dark:border-white/10 dark:text-white/62">
          {selectedComponent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="space-y-3 border-t border-black/10 pt-10 dark:border-white/10">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
          Next
        </p>
        <p className="max-w-2xl text-sm leading-7 text-black/62 dark:text-white/62 sm:text-base">
          This stays intentionally sparse. More components can come in one by
          one, with the same list-first pattern. Meanwhile{' '}
          <Link
            to="/notes"
            className="text-black underline underline-offset-4 dark:text-white"
          >
            Notes
          </Link>{' '}
          can hold the thinking behind them.
        </p>
      </section>
    </CleanLayout>
  )
}


const COMPONENTS = [
  {
    id: 'toolbar',
    title: 'Floating toolbar',
    tag: 'Motion / Navigation',
    previewTone: '#EFEDE8',
    placeholder: '',
    paragraphs: [
      'This borrows from the toolbar language already present in the portfolio and reduces it to the essential interaction: a moving active state, clear icon rhythm, and optional sound feedback.',
      'The goal is not complexity. It is to show that even a small control surface can have taste, responsiveness, and a point of view.',
    ],
  },
  {
    id: 'loader',
    title: 'Glow loader',
    tag: 'Coming next',
    previewTone: '#ECE9E2',
    placeholder: 'Reserved for a glow-loading container.',
    paragraphs: [
      'A loading container with a border glow that feels more like state communication than decoration.',
    ],
  },
  {
    id: 'auth',
    title: 'Auth transition',
    tag: 'Coming next',
    previewTone: '#F1EEE8',
    placeholder: 'Reserved for an auth-to-dashboard transition study.',
    paragraphs: [
      'A study in moving from a clean sign-in surface to an initialized dashboard without a jarring break in layout.',
    ],
  },
]
