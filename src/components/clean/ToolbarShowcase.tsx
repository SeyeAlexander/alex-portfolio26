import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { useSounds } from '@/hooks/useSounds'

// ---------------------------------------------------------------------------
// ToolbarShowcase
//
// This is a visual clone of the FloatingNav already used on the main site
// (src/components/FloatingNav.tsx). It exists on /clean as a demo, so:
//   - the nav buttons do NOT scroll or route anywhere; they only update the
//     local active state and play the tap sound for click feedback.
//   - the sound button does NOT actually toggle the global sound; it only
//     flips its own visual state and plays the tap sound. Real sound stays
//     under the user's control via the top header toggle.
//
// Colors, sizes, icons, ripple, and animations match FloatingNav exactly so
// people on /clean can see the same component that lives on the live site.
// ---------------------------------------------------------------------------

const navItems = [
  { id: 'hero', icon: 'home', label: 'Home' },
  { id: 'stats', icon: 'stats', label: 'Stats' },
  { id: 'me', icon: 'about', label: 'About' },
  { id: 'resume', icon: 'resume', label: 'Experience' },
  { id: 'projects', icon: 'projects', label: 'Projects' },
] as const

function NavIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'home':
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      )
    case 'stats':
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      )
    case 'about':
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )
    case 'resume':
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )
    case 'projects':
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      )
    default:
      return null
  }
}

function AudioLinesIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M2 10v4"
        animate={
          isPlaying ? { d: ['M2 10v4', 'M2 8v8', 'M2 10v4'] } : { d: 'M2 10v4' }
        }
        transition={isPlaying ? { duration: 0.8, repeat: Infinity } : {}}
      />
      <motion.path
        d="M6 6v12"
        animate={
          isPlaying ? { d: ['M6 6v12', 'M6 9v6', 'M6 6v12'] } : { d: 'M6 6v12' }
        }
        transition={isPlaying ? { duration: 0.6, repeat: Infinity } : {}}
      />
      <motion.path
        d="M10 3v18"
        animate={
          isPlaying
            ? { d: ['M10 3v18', 'M10 7v10', 'M10 3v18'] }
            : { d: 'M10 3v18' }
        }
        transition={isPlaying ? { duration: 0.7, repeat: Infinity } : {}}
      />
      <motion.path
        d="M14 8v8"
        animate={
          isPlaying
            ? { d: ['M14 8v8', 'M14 5v14', 'M14 8v8'] }
            : { d: 'M14 8v8' }
        }
        transition={isPlaying ? { duration: 0.5, repeat: Infinity } : {}}
      />
      <motion.path
        d="M18 5v14"
        animate={
          isPlaying
            ? { d: ['M18 5v14', 'M18 8v8', 'M18 5v14'] }
            : { d: 'M18 5v14' }
        }
        transition={isPlaying ? { duration: 0.9, repeat: Infinity } : {}}
      />
      <motion.path
        d="M22 10v4"
        animate={
          isPlaying
            ? { d: ['M22 10v4', 'M22 7v10', 'M22 10v4'] }
            : { d: 'M22 10v4' }
        }
        transition={isPlaying ? { duration: 0.6, repeat: Infinity } : {}}
      />
    </svg>
  )
}

export function ToolbarShowcase() {
  const [activeSection, setActiveSection] = useState<string>('me')
  const [ripple, setRipple] = useState<{ id: string; key: number } | null>(null)
  // Local visual state only — does NOT call toggleSound, so the global
  // user-controlled sound preference stays untouched.
  const [soundVisuallyOn, setSoundVisuallyOn] = useState(true)
  const { playSound } = useSounds()
  // useId() namespaces the active-pill layoutId per instance so two
  // ToolbarShowcase instances (e.g. one on the card, one in the drawer)
  // don't share the layout animation — clicking an item in one would
  // otherwise "steal" the active bg from the other.
  const reactId = useId()

  const handleItemClick = (id: string) => {
    playSound('tap')
    setRipple({ id, key: Date.now() })
    setActiveSection(id)
    setTimeout(() => setRipple(null), 600)
  }

  const handleSoundClick = () => {
    playSound('tap')
    setSoundVisuallyOn((current) => !current)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex items-center gap-1 px-2 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => handleItemClick(item.id)}
            whileTap={{ scale: 0.85 }}
            className={`relative p-3 rounded-full transition-colors duration-200 overflow-hidden ${
              activeSection === item.id
                ? 'text-black'
                : 'text-white/60 lg:hover:text-white lg:hover:bg-white/10'
            }`}
            title={item.label}
          >
            {/* Water drop ripple effect */}
            <AnimatePresence>
              {ripple?.id === item.id && (
                <motion.span
                  key={ripple.key}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 bg-orange rounded-full origin-center"
                />
              )}
            </AnimatePresence>

            <span className="relative z-10">
              <NavIcon icon={item.icon} />
            </span>

            {activeSection === item.id && (
              <motion.div
                layoutId={`${reactId}-toolbar-active`}
                className="absolute inset-0 bg-orange rounded-full -z-10"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
          </motion.button>
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Sound Toggle (visual only) */}
        <motion.button
          type="button"
          onClick={handleSoundClick}
          whileTap={{ scale: 0.85 }}
          className={`relative p-3 rounded-full transition-colors duration-200 ${
            soundVisuallyOn
              ? 'text-orange'
              : 'text-white/40 lg:hover:text-white/60'
          }`}
          title={soundVisuallyOn ? 'Sound On' : 'Sound Off'}
        >
          <AudioLinesIcon isPlaying={soundVisuallyOn} />
        </motion.button>
      </div>
    </div>
  )
}
