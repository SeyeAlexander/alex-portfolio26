import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CleanLayout } from '@/components/clean/CleanLayout'
import {
  ComponentDrawer,
  DRAWER_MARGIN,
  DRAWER_WIDTH,
} from '@/components/clean/ComponentDrawer'
import { FabShowcase } from '@/components/clean/FabShowcase'
import { ToolbarShowcase } from '@/components/clean/ToolbarShowcase'

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

type ComponentEntry = {
  id: string
  title: string
  tag: string
  previewTone: string
  Preview: () => React.ReactNode
  description: string
  code: string
}

// ---------------------------------------------------------------------------
// Source strings shown in each component's Code tab.
// Declared BEFORE the COMPONENTS array because `const` is not hoisted —
// referencing them later in the array would throw a TDZ error.
// ---------------------------------------------------------------------------

const TOOLBAR_CODE = `import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { id: 'hero', icon: 'home', label: 'Home' },
  { id: 'stats', icon: 'stats', label: 'Stats' },
  { id: 'me', icon: 'about', label: 'About' },
  { id: 'resume', icon: 'resume', label: 'Experience' },
  { id: 'projects', icon: 'projects', label: 'Projects' },
]

export function FloatingToolbar() {
  const [active, setActive] = useState('me')
  const [ripple, setRipple] = useState<{ id: string; key: number } | null>(null)

  const handleClick = (id: string) => {
    setRipple({ id, key: Date.now() })
    setActive(id)
    setTimeout(() => setRipple(null), 600)
  }

  return (
    <div className="flex items-center gap-1 px-2 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => handleClick(item.id)}
          whileTap={{ scale: 0.85 }}
          className={
            'relative p-3 rounded-full transition-colors duration-200 overflow-hidden ' +
            (active === item.id ? 'text-black' : 'text-white/60 hover:text-white hover:bg-white/10')
          }
        >
          <AnimatePresence>
            {ripple?.id === item.id && (
              <motion.span
                key={ripple.key}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 bg-orange rounded-full origin-center"
              />
            )}
          </AnimatePresence>

          <span className="relative z-10"><Icon name={item.icon} /></span>

          {active === item.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute inset-0 bg-orange rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
`

const FAB_CODE = `import { AnimatePresence, motion } from 'framer-motion'
import { Link2, MessageCircle, Plus, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const BUTTON_SIZE = 52
const STEP = BUTTON_SIZE + 14

const ACTIONS = [
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'comment', label: 'Comment', icon: MessageCircle },
  { id: 'copy', label: 'Copy link', icon: Link2 },
] as const

export function ExpandingFab() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Click outside to close
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={containerRef} className="relative" style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}>
      <AnimatePresence>
        {open ? ACTIONS.map((action, index) => {
          const Icon = action.icon
          const distanceFromTrigger = ACTIONS.length - index
          const restingTop = -distanceFromTrigger * STEP
          const stagger = (ACTIONS.length - 1 - index) * 0.05

          return (
            <motion.div
              key={action.id}
              initial={{ y: distanceFromTrigger * STEP, scale: 0.3, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1,
                transition: { delay: stagger, type: 'spring', stiffness: 360, damping: 26 } }}
              exit={{ y: distanceFromTrigger * STEP, scale: 0.3, opacity: 0,
                transition: { delay: index * 0.03, duration: 0.22 } }}
              className="absolute left-0"
              style={{ top: restingTop, width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              <button className="h-full w-full rounded-full border border-white/15 bg-black/90 text-white/85">
                <Icon className="h-[18px] w-[18px]" />
              </button>
            </motion.div>
          )
        }) : null}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(v => !v)}
        whileTap={{ scale: 0.92 }}
        className="h-full w-full rounded-full bg-orange text-black"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }}>
          <Plus className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </div>
  )
}
`

const COMPONENTS: ComponentEntry[] = [
  {
    id: 'toolbar',
    title: 'Floating toolbar',
    tag: 'Motion / Navigation',
    previewTone: '#EFEDE8',
    Preview: () => <ToolbarShowcase />,
    description: `This borrows from the toolbar language already present in the portfolio and reduces it to the essential interaction: a moving active state, clear icon rhythm, and optional sound feedback.

The goal is not complexity. It is to show that even a small control surface can have taste, responsiveness, and a point of view.`,
    code: TOOLBAR_CODE,
  },
  {
    id: 'fab',
    title: 'Expanding action button',
    tag: 'Motion / Action',
    previewTone: '#ECE9E2',
    Preview: () => <FabShowcase />,
    description: `A trigger that expands into a stack of secondary actions. The buttons morph out of the trigger position with a small spring stagger so the group reads as one motion, not three separate entrances. Closing reverses the motion — the buttons collapse back into the trigger.

The plus icon rotates as it opens, which gives a clear close affordance without needing a second close button. Click outside to dismiss.`,
    code: FAB_CODE,
  },
]

function useIsLgUp() {
  const [isLgUp, setIsLgUp] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsLgUp(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isLgUp
}

function CleanPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const isLgUp = useIsLgUp()
  const openEntry = COMPONENTS.find((entry) => entry.id === openId) ?? null

  // Drawer + content shift are desktop-only; mobile plays with components inline.
  const drawerOpen = isLgUp && openId !== null
  const shift = drawerOpen
    ? Math.round((DRAWER_WIDTH + DRAWER_MARGIN) / 2)
    : 0

  useEffect(() => {
    if (!isLgUp && openId !== null) setOpenId(null)
  }, [isLgUp, openId])

  return (
    <CleanLayout active="clean" title="clean" contentShift={shift}>
      <section className="space-y-6">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
          Clean Components
        </p>
        <h2 className="max-w-2xl text-2xl font-medium leading-[1.18] tracking-[-0.03em]">
          A small place for interface details I want to keep building in
          public.
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-black/62 dark:text-white/62">
          Each component is live — play with it directly.{' '}
          <span className="hidden md:inline">
            Click{' '}
            <span className="font-medium text-black dark:text-white">View</span>{' '}
            to see the source and the thinking behind it.
          </span>
        </p>
      </section>

      <section className="space-y-16">
        {COMPONENTS.map((item) => (
          <ComponentCard
            key={item.id}
            entry={item}
            onOpen={isLgUp ? () => setOpenId(item.id) : undefined}
            showViewButton={isLgUp}
          />
        ))}
      </section>

      <section className="border-t border-black/10 pt-10 dark:border-white/10">
        <p className="max-w-2xl text-sm leading-7 text-black/62 dark:text-white/62 sm:text-base">
          This stays intentionally sparse. More components land here one at a
          time, with the same list-first pattern. Meanwhile{' '}
          <Link
            to="/notes"
            className="text-black underline underline-offset-4 dark:text-white"
          >
            Notes
          </Link>{' '}
          holds the thinking behind them.
        </p>
      </section>

      {openEntry && isLgUp ? (
        <ComponentDrawer
          open={drawerOpen}
          onOpenChange={(next) => {
            if (!next) setOpenId(null)
          }}
          title={openEntry.title}
          tag={openEntry.tag}
          description={openEntry.description}
          preview={openEntry.Preview()}
          code={openEntry.code}
        />
      ) : null}
    </CleanLayout>
  )
}

function ComponentCard({
  entry,
  onOpen,
  showViewButton,
}: {
  entry: ComponentEntry
  onOpen?: () => void
  showViewButton: boolean
}) {
  // No surface-click trigger any more — the live component fully owns the
  // card area. The drawer opens via the explicit "View" button on the
  // top-right of the card. This makes the affordance discoverable and works
  // regardless of how much of the card a given component fills.
  return (
    <article className="space-y-6">
      <div
        className="relative flex min-h-[420px] items-center justify-center rounded-[28px] border border-black/8 p-8 dark:border-white/10"
        style={{ backgroundColor: entry.previewTone }}
      >
        {showViewButton && onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`View ${entry.title} details`}
            className="absolute right-5 top-5 z-10 hidden md:inline-flex h-8 items-center gap-1.5 rounded-full border border-black/10 bg-white/85 px-3 font-geist-mono text-[11px] tracking-tight text-black/70 backdrop-blur transition-all duration-200 lg:hover:border-black/25 lg:hover:text-black dark:border-white/12 dark:bg-black/55 dark:text-white/75 dark:lg:hover:text-white"
          >
            View
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
        ) : null}

        <div className="w-full max-w-[700px]">{entry.Preview()}</div>
      </div>

      <div className="space-y-1">
        <p className="text-lg font-medium tracking-[-0.03em]">{entry.title}</p>
        <p className="text-sm text-black/45 dark:text-white/45">{entry.tag}</p>
      </div>
    </article>
  )
}

