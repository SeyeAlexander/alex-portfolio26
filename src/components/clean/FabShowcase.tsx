import { AnimatePresence, motion } from 'framer-motion'
import { Link2, MessageCircle, Plus, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSounds } from '@/hooks/useSounds'

// ---------------------------------------------------------------------------
// FabShowcase
//
// Expanding floating action button. Trigger and every secondary action are
// the SAME size (BUTTON_SIZE). Secondary buttons appear to morph out of the
// trigger position upward, and reverse the motion on close so they look like
// they drop back into the trigger.
//
// Implementation notes:
//   - All buttons share BUTTON_SIZE so the column reads as a clean vertical
//     spine. Optical center is consistent — labels do not push the icons
//     off-axis because labels are absolutely positioned to the right of the
//     button (using `right-full`) and don't participate in the row's flex
//     centering.
//   - Each secondary's initial y is `(index_from_trigger) * STEP`, i.e. it
//     starts collocated with the trigger and animates *to* y:0 (its resting
//     stacked position). scale: 0 → 1 and opacity: 0 → 1 happen alongside so
//     the morph reads as a single motion.
//   - On exit, framer reverses the initial→animate, so they retract back into
//     the trigger.
// ---------------------------------------------------------------------------

const BUTTON_SIZE = 52
const STEP = BUTTON_SIZE + 14 // px between each secondary

const ACTIONS = [
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'comment', label: 'Comment', icon: MessageCircle },
  { id: 'copy', label: 'Copy link', icon: Link2 },
] as const

export function FabShowcase() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { playSound } = useSounds()

  // Click-outside to close.
  useEffect(() => {
    if (!open) return
    const handleMouseDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [open])

  const handleToggle = () => {
    playSound('tap')
    setOpen((current) => !current)
  }

  return (
    <div className="relative flex h-[340px] w-full items-end justify-center">
      <div
        ref={containerRef}
        // Pin the trigger to a fixed column so the secondary buttons can be
        // absolutely positioned above it on the same x.
        className="relative"
        style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
      >
        {/* Secondary buttons stack — absolutely positioned, anchored to the
            trigger. */}
        <AnimatePresence>
          {open
            ? ACTIONS.map((action, index) => {
                const Icon = action.icon
                // The bottom-most secondary is `ACTIONS.length - 1 - index`
                // from the bottom-most spot (which is 1 STEP above the
                // trigger). For index 0 ("Share", top), distanceFromTrigger
                // is 3; for index 2 ("Copy link", bottom), it's 1.
                const distanceFromTrigger = ACTIONS.length - index
                const restingTop = -distanceFromTrigger * STEP
                // Stagger: bottom-most enters first (closest to trigger).
                const stagger = (ACTIONS.length - 1 - index) * 0.05

                return (
                  <motion.div
                    key={action.id}
                    initial={{
                      y: distanceFromTrigger * STEP, // start at trigger position
                      scale: 0.3,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: stagger,
                        type: 'spring',
                        stiffness: 360,
                        damping: 26,
                        mass: 0.7,
                      },
                    }}
                    exit={{
                      y: distanceFromTrigger * STEP,
                      scale: 0.3,
                      opacity: 0,
                      transition: {
                        delay: index * 0.03,
                        duration: 0.22,
                        ease: [0.4, 0, 1, 1],
                      },
                    }}
                    className="absolute left-0"
                    style={{
                      top: restingTop,
                      width: BUTTON_SIZE,
                      height: BUTTON_SIZE,
                    }}
                  >
                    {/* The row: button is the anchor, label is absolutely
                        positioned to its left via `right-full`. */}
                    <div className="relative h-full w-full">
                      {/* Label pill */}
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: stagger + 0.1,
                            duration: 0.18,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: 6,
                          transition: { duration: 0.1 },
                        }}
                        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 font-geist-mono text-[11px] tracking-tight text-black shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]"
                      >
                        {action.label}
                      </motion.span>

                      {/* Action button */}
                      <button
                        type="button"
                        onClick={() => {
                          playSound('tap')
                          setOpen(false)
                        }}
                        className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-black/90 text-white/85 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] transition-colors lg:hover:border-orange/60 lg:hover:text-orange"
                        aria-label={action.label}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                      </button>
                    </div>
                  </motion.div>
                )
              })
            : null}
        </AnimatePresence>

        {/* Trigger — same size as the secondaries */}
        <motion.button
          type="button"
          onClick={handleToggle}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-full w-full items-center justify-center rounded-full bg-orange text-black shadow-[0_18px_40px_-16px_rgba(255,85,0,0.55)] transition-shadow lg:hover:shadow-[0_24px_50px_-16px_rgba(255,85,0,0.7)]"
          aria-label={open ? 'Close actions' : 'Open actions'}
          aria-expanded={open}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="flex items-center justify-center"
          >
            <Plus className="h-5 w-5" strokeWidth={2.4} />
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}
