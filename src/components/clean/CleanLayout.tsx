import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useSounds } from '@/hooks/useSounds'
import forestAudio from './Forest (1).mp3'
import leavesVideo from './Leaves video.mp4'
import { ThemeToggle } from './theme-toggle'

const CLEAN_THEME_KEY = 'clean-theme'

type CleanTheme = 'light' | 'dark' | 'sunny'

function getInitialTheme(enableSunnyMode: boolean): CleanTheme {
  if (typeof document === 'undefined') return 'light'
  // Read from the blocking script's attribute (already applied before paint)
  const attr = document.documentElement.getAttribute('data-clean-theme')
  if (attr === 'dark' || attr === 'light') return attr
  if (enableSunnyMode && attr === 'sunny') return attr
  // Fallback: check localStorage then system preference
  try {
    const stored = localStorage.getItem(CLEAN_THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    if (enableSunnyMode && stored === 'sunny') return stored
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

type CleanLayoutProps = {
  title: string
  active: 'clean' | 'notes'
  enableSunnyMode?: boolean
  children: React.ReactNode
}

export function CleanLayout({
  title,
  active,
  enableSunnyMode = false,
  children,
}: CleanLayoutProps) {
  const [theme, setTheme] = useState<CleanTheme>(() =>
    getInitialTheme(enableSunnyMode),
  )
  const [isQuiet, setIsQuiet] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { enabled: soundsEnabled } = useSounds()

  useEffect(() => {
    // Sync localStorage, <html> class, and data attribute when theme changes
    window.localStorage.setItem(CLEAN_THEME_KEY, theme)
    document.documentElement.setAttribute('data-clean-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    if (!enableSunnyMode && theme === 'sunny') {
      setTheme('light')
    }
  }, [enableSunnyMode, theme])

  useEffect(() => {
    if (theme !== 'sunny' && isQuiet) {
      setIsQuiet(false)
    }
  }, [isQuiet, theme])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (theme !== 'sunny' || isQuiet || !soundsEnabled) {
      audio.pause()
      audio.currentTime = 0
      return
    }

    const playback = audio.play()
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {})
    }
  }, [isQuiet, soundsEnabled, theme])

  const isDark = theme === 'dark'
  const isSunny = enableSunnyMode && theme === 'sunny'
  const nextTheme = () => {
    if (enableSunnyMode) {
      setTheme((current) => {
        if (current === 'light') return 'dark'
        if (current === 'dark') return 'sunny'
        return 'light'
      })
      return
    }

    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={cn('min-h-screen', isDark && 'dark')}>
      <div
        className="min-h-screen text-black transition-colors dark:text-white"
        style={{
          backgroundColor: isDark ? '#0D0D0E' : isSunny ? '#F2F6F1' : '#F3F4F6',
          fontFamily:
            "'GeistMono', 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        }}
      >
        {isSunny ? (
          <>
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover object-center opacity-[0.94] saturate-[1.12] contrast-[1.03]"
              >
                <source src={leavesVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_34%),linear-gradient(180deg,rgba(245,249,245,0.20),rgba(237,244,239,0.34))]" />
            </div>
            <audio ref={audioRef} src={forestAudio} loop preload="auto" />
          </>
        ) : null}

        <div className="mx-auto max-w-[820px] px-5 pb-24 pt-8 sm:px-8">
          <header className="relative z-10 mb-24 flex items-center justify-between gap-6 transition-all duration-300 ease-out">
            <h1 className="text-xl font-medium tracking-[-0.03em]">{title}.</h1>

            <nav className="flex items-center gap-4 pt-1 text-right transition-all duration-300 ease-out">
              <PageLink to="/clean" active={active === 'clean'}>
                Clean
              </PageLink>
              <PageLink to="/notes" active={active === 'notes'}>
                Notes
              </PageLink>
              <Link
                to="/"
                className="text-sm text-black/45 transition-colors hover:text-black dark:text-white/45 dark:hover:text-white"
              >
                Seye Alexander
              </Link>

              <ThemeToggle
                theme={theme}
                supportsSunny={enableSunnyMode}
                onToggleTheme={nextTheme}
                showQuietButton={isSunny}
                isQuiet={isQuiet}
                onToggleQuiet={() => setIsQuiet((current) => !current)}
              />
            </nav>
          </header>

          <main className="relative z-10 space-y-12">{children}</main>
        </div>
      </div>
    </div>
  )
}

function PageLink({
  to,
  active,
  children,
}: {
  to: '/clean' | '/notes'
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center text-sm transition-colors',
        active
          ? 'text-black dark:text-white hidden'
          : 'text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white',
      )}
    >
      <span>{children}</span>
    </Link>
  )
}
