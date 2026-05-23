import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX, Waves } from 'lucide-react'

import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  theme: 'light' | 'dark' | 'sunny'
  supportsSunny?: boolean
  onToggleTheme: () => void
  showQuietButton?: boolean
  isQuiet?: boolean
  onToggleQuiet?: () => void
}

export function ThemeToggle({
  theme,
  supportsSunny = false,
  onToggleTheme,
  showQuietButton = false,
  isQuiet = false,
  onToggleQuiet,
}: ThemeToggleProps) {
  const themeLabel =
    !supportsSunny && theme === 'dark'
      ? 'Switch theme to light mode'
      : theme === 'dark'
      ? 'Switch theme to sunny mode'
      : theme === 'sunny'
        ? 'Switch theme to light mode'
        : 'Switch theme to dark mode'

  if (!supportsSunny) {
    return (
      <div className="inline-flex h-[30px] w-6 items-center justify-center">
        <button
          type="button"
          aria-label={themeLabel}
          onClick={onToggleTheme}
          className="relative inline-flex size-6 items-center justify-center overflow-hidden rounded-full bg-black p-0 text-white transition-all duration-300 ease-out active:scale-95 dark:bg-white dark:text-black"
        >
          <span className="sr-only">{themeLabel}</span>
          <svg
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.g
              animate={{ rotate: theme === 'dark' ? -180 : 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
            >
              <path
                d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
                fill="white"
              />
              <path
                d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
                fill="black"
              />
            </motion.g>
            <motion.path
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    )
  }

  // Reserve real width in the nav row when the quiet button is visible, so
  // siblings (Clean, Seye Alexander) slide left smoothly instead of being
  // overlapped by the absolute quiet pill.
  const reservedWidth = supportsSunny && showQuietButton ? 64 : 24

  return (
    <motion.div
      animate={{ width: reservedWidth }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative inline-flex h-[30px] items-center justify-end"
    >
      <motion.button
        type="button"
        aria-label={themeLabel}
        onClick={onToggleTheme}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          'relative z-10 inline-flex size-6 items-center justify-center overflow-hidden rounded-full bg-black p-0 text-white transition-all duration-300 ease-out active:scale-95 dark:bg-white dark:text-black',
          showQuietButton &&
            'shadow-[0_10px_24px_rgba(36,68,55,0.16)] ring-1 ring-white/30 dark:ring-black/12',
        )}
      >
        <span className="sr-only">{themeLabel}</span>

        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={theme}
            initial={{ opacity: 0, scale: 0.72, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.72, rotate: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === 'sunny' ? (
              <Waves className="h-3.5 w-3.5" />
            ) : (
              <svg
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.g
                  animate={{ rotate: theme === 'dark' ? -180 : 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                >
                  <path
                    d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
                    fill="white"
                  />
                  <path
                    d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
                    fill="black"
                  />
                </motion.g>
                <motion.path
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.5 }}
                  d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
                  fill="white"
                />
              </svg>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {supportsSunny && onToggleQuiet ? (
        <motion.button
          type="button"
          aria-label={isQuiet ? 'Resume forest ambience' : 'Quiet forest ambience'}
          aria-pressed={isQuiet}
          onClick={onToggleQuiet}
          animate={{
            opacity: showQuietButton ? 1 : 0,
            scale: showQuietButton ? 1 : 0.72,
            x: showQuietButton ? 0 : 6,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          // Anchor the quiet button to the LEFT edge of the reserved
          // container instead of `right-full`. That keeps it inside the
          // 64px reserved width and stops it overlapping the nav items to
          // the left (Seye Alexander).
          className={cn(
            'pointer-events-none absolute left-0 top-1/2 inline-flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center overflow-hidden rounded-full text-[#244437] shadow-[0_12px_24px_rgba(36,68,55,0.10)] backdrop-blur-md transition-all duration-300 ease-out active:scale-95',
            isQuiet
              ? 'bg-[rgba(237,243,240,0.82)] text-[#183628]'
              : 'bg-[rgba(248,251,249,0.76)] text-[#244437]',
            showQuietButton && 'pointer-events-auto',
          )}
        >
          <motion.span
            key={isQuiet ? 'quiet-off' : 'quiet-on'}
            initial={{ opacity: 0, scale: 0.7, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            {isQuiet ? (
              <VolumeX className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 shrink-0" />
            )}
          </motion.span>
        </motion.button>
      ) : null}
    </motion.div>
  )
}
