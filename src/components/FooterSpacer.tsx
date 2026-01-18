import { useSounds } from '../hooks/useSounds'

export function FooterSpacer() {
  const { playSound } = useSounds()
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative z-10 bg-cream py-10 md:py-12 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-geist-mono text-xs md:text-sm text-black/50 tracking-wide text-center max-w-4xl">
          Tanstack Start, Framer Motion, Tailwind CSS. Built, and refined with
          intent in ~36 hours.
        </p>

        <p className="font-geist-mono text-xs md:text-sm text-black/50 tracking-widest text-center">
          You're viewing Alex's Resume on{' '}
          <span className="text-black font-bold">{formattedDate}</span>
        </p>

        <p className="font-geist-mono text-xs text-black/40">
          Check Alex's{' '}
          <a
            href="https://alexander-delta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('tap')}
            className="text-orange hover:text-orange/80 underline underline-offset-2 transition-colors"
          >
            2025 Portfolio Look
          </a>
        </p>
      </div>
    </div>
  )
}
