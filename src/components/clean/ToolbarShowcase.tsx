import { motion } from 'framer-motion'
import { Briefcase, FolderKanban, House, UserRound } from 'lucide-react'
import { useState } from 'react'
import { SoundToggle } from '@/components/SoundToggle'
import { useSounds } from '@/hooks/useSounds'
import { cn } from '@/lib/utils'

const ITEMS = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
] as const

export function ToolbarShowcase() {
  const [active, setActive] = useState<(typeof ITEMS)[number]['id']>('about')
  const { playSound } = useSounds()

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] p-4 sm:p-6">
        <div
          className="rounded-[24px] px-3 py-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border dark:border-white/10 dark:text-black dark:shadow-none"
          style={{ backgroundColor: '#111112' }}
        >
          <div className="flex flex-wrap items-center gap-2">
            {ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  onClick={() => {
                    setActive(item.id)
                    playSound('tap')
                  }}
                  className={cn(
                    'relative inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm text-white/65 transition-colors dark:text-black/55',
                    isActive && 'text-black dark:text-white',
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="clean-toolbar-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-black"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </span>
                </button>
              )
            })}

            <div className="ml-auto flex items-center rounded-full border border-white/12 bg-white/6 px-2 py-2 dark:border-black/10 dark:bg-black/6">
              <SoundToggle />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
