import { motion } from 'framer-motion'
import {
  AudioWaveform,
  Sparkles,
  ToggleLeft,
} from 'lucide-react'
import { useSounds } from '@/hooks/useSounds'

const SOUND_ACTIONS = [
  {
    id: 'tap',
    label: 'Tap',
    description: 'A light confirmation for compact UI actions.',
    icon: Sparkles,
    size: 'large',
  },
  {
    id: 'switch',
    label: 'Switch',
    description: 'Better for toggles and state changes.',
    icon: ToggleLeft,
    size: 'small',
  },
  {
    id: 'handgun',
    label: 'Accent',
    description: 'Sharper, more dramatic, so use very sparingly.',
    icon: AudioWaveform,
    size: 'small',
  },
] as const

function AudioLinesIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      className="h-4 w-4"
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

export function SoundTester() {
  const { enabled, toggleSound, playSound } = useSounds()

  const playSoundInstant = (soundId: (typeof SOUND_ACTIONS)[number]['id']) => {
    playSound(soundId)
  }

  return (
    <div className="space-y-6 rounded-[30px] border border-dashed border-current/18 bg-transparent p-5 shadow-[0_20px_60px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-geist-mono text-[11px] uppercase tracking-[0.28em] text-current/45">
            Sound Tester
          </p>
          <p className="mt-2 text-sm leading-7 text-current/68">
            Try the current interaction sounds and decide which ones feel useful
            instead of loud.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
          className="inline-flex p-2 items-center justify-center rounded-full border border-current/10 bg-black text-white shadow-[0_14px_30px_rgba(0,0,0,0.14)] transition-colors lg:hover:bg-black/90 dark:bg-[#b9c1cb] dark:text-[#111214] dark:shadow-[0_10px_28px_rgba(0,0,0,0.18)] dark:lg:hover:bg-[#c1c8d1]"
        >
          <AudioLinesIcon isPlaying={enabled} />
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        {SOUND_ACTIONS.map((sound) => (
          <button
            key={sound.id}
            type="button"
            onPointerDown={() => playSoundInstant(sound.id)}
            onClick={(event) => {
              if (event.detail === 0) {
                playSoundInstant(sound.id)
              }
            }}
            className={[
              'group relative overflow-hidden rounded-[18px] border text-left transition-transform duration-300 lg:hover:-translate-y-0.5 active:scale-[0.985]',
              'border-black/8 bg-black text-white shadow-[0_18px_40px_rgba(17,17,18,0.14)] dark:border-[#d7dde5]/25 dark:bg-[linear-gradient(180deg,#c7ced6,#b7c0cb)] dark:text-[#111214] dark:shadow-[0_18px_40px_rgba(0,0,0,0.18)]',
              sound.size === 'large'
                ? 'min-h-[228px] md:row-span-2'
                : 'min-h-[108px]',
            ].join(' ')}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_32%)] opacity-70 transition-opacity duration-500 lg:group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(55,65,81,0.10),transparent_32%)]" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100">
              <div className="absolute inset-y-0 left-[-20%] w-[40%] rotate-14 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] blur-lg dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.20),transparent)]" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:bg-black/6 dark:text-black/72 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]">
                  <sound.icon className="h-4 w-4" />
                </div>

                <span className="font-geist-mono text-[11px] uppercase tracking-[0.24em] text-white/45 dark:text-black/42">
                  Play
                </span>
              </div>

              <div>
                <p className="text-base font-medium tracking-[-0.03em]">
                  {sound.label}
                </p>
                <p className="mt-2 max-w-[20rem] text-sm leading-6 text-white/62 dark:text-black/60">
                  {sound.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
