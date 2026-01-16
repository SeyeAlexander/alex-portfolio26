import { useState } from 'react'
import { useSounds } from '../hooks/useSounds'

export function FooterSection() {
  const [isFlipped1, setIsFlipped1] = useState(false)
  const { playSound } = useSounds()

  const handleCardClick = () => {
    playSound('switch')
    setIsFlipped1(!isFlipped1)
  }

  return (
    <footer className="relative z-10 bg-black text-cream pt-16 pb-10 px-4 md:px-[20px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-8">
          <div
            className="group relative cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={handleCardClick}
            title="tap"
          >
            {/* Tooltip */}
            <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <span className="bg-cream text-black text-xs font-geist-mono px-2 py-1 rounded">
                tap
              </span>
            </div>

            <div
              className="relative transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped1 ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front - Japanese */}
              <div
                className="relative bg-cream/10 border border-cream/20 rounded-md px-12 py-12 md:px-12 md:pt-16 md:pb-4"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="font-korium text-6xl md:text-8xl lg:text-[140px] text-cream font-bold leading-tight tracking-wide">
                  <p>無</p>
                  <p style={{ marginLeft: 'calc(1ch + 0.1em)' }}>限</p>
                </div>
                <p className="font-geist-mono text-cream/50 text-right text-xs md:text-xs uppercase tracking-[0.3em] mt-14">
                  Infinity
                </p>
              </div>

              {/* Back - Yoruba */}
              <div
                className="absolute inset-0 bg-cream/10 border border-cream/20 rounded-md px-12 py-12 md:px-12 md:pt-16 md:pb-4"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="font-korium text-6xl md:text-8xl lg:text-[140px] text-cream font-bold leading-tight tracking-wide">
                  <p>Sí</p>
                  <p style={{ marginLeft: 'calc(1ch + 0.1em)' }}>sẹ́</p>
                </div>
                <p className="font-geist-mono text-cream/50 text-right text-xs md:text-xs uppercase tracking-[0.3em] mt-14">
                  Work hard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 - Contact & Branding */}
        <div className="flex flex-col items-end text-right space-y-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              playSound('handgun')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-korium select-none text-xl md:text-2xl leading-5 tracking-wider text-orange font-extrabold hover:opacity-80 transition-opacity"
          >
            <div>SE</div>
            <div>YE</div>
          </a>

          <div className="space-y-4">
            <p className="font-geist-mono text-cream/70 text-sm md:text-base">
              Get me on your next top project
            </p>
            <a
              href="mailto:ojubanirealex@gmail.com"
              onClick={() => playSound('tap')}
              className="font-geist-mono text-orange hover:text-orange/80 text-sm md:text-base transition-colors"
            >
              ojubanirealex@gmail.com
            </a>
          </div>

          <div className="flex gap-6 items-center">
            <a
              href="https://github.com/seyealexander"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-cream transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/seyealexander"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-cream transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/seyealexander"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-cream transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Taglines & Copyright */}

      <div className="flex items-center justify-between font-geist-mono px-14 pt-4 text-xs text-cream/30">
        <p className="transition-opacity duration-300 w-full">
          {isFlipped1
            ? 'And their language classes'
            : 'Coders love their JJKs and KNYs'}
        </p>

        <p className="text-end w-full">
          © 2026 Seye Alexander. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
