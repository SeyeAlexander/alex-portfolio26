import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// HeroVariants
//
// Four candidate "secondary hero" concepts stacked vertically so the
// strongest one can be picked on visual feel. Each variant gets a small
// label tag so the comparison is obvious. After a pick, the other three +
// the labels get pruned.
//
//   A — Now-playing status board (4 crosshair cells)
//   B — Scrolling marquee ribbon
//   C — Big single-line typographic statement
//   D — Vertical manifesto block
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export function HeroVariants() {
  return (
    <div className="relative z-10">
      <VariantA />
      <VariantB />
      <VariantC />
      <VariantD />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function VariantLabel({
  letter,
  name,
  tone,
}: {
  letter: 'A' | 'B' | 'C' | 'D'
  name: string
  tone: 'cream' | 'black'
}) {
  const text = tone === 'cream' ? 'text-black/45' : 'text-white/45'
  return (
    <p
      className={`font-geist-mono text-[10px] uppercase tracking-[0.32em] ${text} mb-5`}
    >
      Variant {letter} · {name}
    </p>
  )
}

/** Sharp crosshair-cornered panel — mirrors the TextFlow vocabulary. */
function CrosshairCell({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: 'cream' | 'black'
}) {
  const line = tone === 'cream' ? 'bg-black/55' : 'bg-white/55'
  const bg = tone === 'cream' ? 'bg-cream' : 'bg-black'
  return (
    <div className={`relative p-5 ${bg}`}>
      {[
        '-top-[5px] -left-[5px]',
        '-top-[5px] -right-[5px]',
        '-bottom-[5px] -left-[5px]',
        '-bottom-[5px] -right-[5px]',
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pos} z-10 flex h-2.5 w-2.5 items-center justify-center`}
        >
          <span className={`absolute h-px w-full ${line}`} />
          <span className={`absolute h-full w-px ${line}`} />
        </span>
      ))}
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// VARIANT A — Now-playing status board
// ---------------------------------------------------------------------------

function VariantA() {
  const cells = [
    {
      label: 'Now',
      dot: 'bg-green-500',
      title: 'Senior Frontend Engineer',
      sub: 'Layers AI · Remote',
    },
    {
      label: 'Shipping',
      dot: 'bg-orange',
      title: 'App Machina',
      sub: 'Live · per-network attribution',
    },
    {
      label: 'Open for',
      dot: 'bg-white/60',
      title: 'Senior FE roles',
      sub: 'Remote-first',
    },
    {
      label: 'Contact',
      dot: 'bg-cream',
      title: 'hello@seyealexander.dev',
      sub: 'Replies within 24h',
    },
  ]

  return (
    <section className="relative bg-cream py-14 md:py-18">
      <div className="relative px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <VariantLabel letter="A" name="Now-playing status board" tone="cream" />
        <div className="grid grid-cols-1 gap-px bg-black/12 sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: '-40px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
            >
              <CrosshairCell tone="cream">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-1.5 w-1.5 ${cell.dot}`}
                    />
                    <span className="font-geist-mono text-[10px] uppercase tracking-[0.28em] text-black/55">
                      {cell.label}
                    </span>
                  </div>
                  <p className="font-geist text-base font-bold text-black leading-tight">
                    {cell.title}
                  </p>
                  <p className="font-geist-mono text-[11px] leading-5 text-black/55">
                    {cell.sub}
                  </p>
                </div>
              </CrosshairCell>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// VARIANT B — Scrolling marquee ribbon
// ---------------------------------------------------------------------------

function VariantB() {
  const phrases = [
    'BUILDING APP MACHINA',
    'LIVE FROM LAGOS',
    'OPEN FOR REMOTE',
    'TYPESCRIPT · REACT · NODE',
    'SHIPPING DAILY',
    'CRAFT OVER CHAOS',
  ]
  // Duplicate so the loop is seamless.
  const loop = [...phrases, ...phrases]

  return (
    <section className="relative bg-black py-10 md:py-12 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-5">
        <VariantLabel letter="B" name="Scrolling marquee ribbon" tone="black" />
      </div>
      <div className="relative w-full overflow-hidden border-y border-white/15">
        <div
          className="flex whitespace-nowrap py-6"
          style={{ animation: 'hero-marquee 40s linear infinite' }}
        >
          {loop.map((phrase, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-8 font-korium text-3xl md:text-5xl font-bold tracking-tight text-cream"
            >
              {phrase}
              <span className="inline-block h-2 w-2 rotate-45 bg-orange" />
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes hero-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

// ---------------------------------------------------------------------------
// VARIANT C — Big single-line typographic statement
// ---------------------------------------------------------------------------

function VariantC() {
  return (
    <section className="relative bg-cream py-20 md:py-28">
      {/* Crosshair brackets at the section corners */}
      {[
        'top-[16px] left-[20px]',
        'top-[16px] right-[20px]',
        'bottom-[16px] left-[20px]',
        'bottom-[16px] right-[20px]',
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute ${pos} z-10 flex h-3 w-3 items-center justify-center -translate-x-1/2`}
        >
          <span className="absolute h-px w-full bg-black/70" />
          <span className="absolute h-full w-px bg-black/70" />
        </span>
      ))}
      <div className="absolute top-[16px] left-[20px] right-[20px] h-px bg-black/10" />
      <div className="absolute bottom-[16px] left-[20px] right-[20px] h-px bg-black/10" />

      <div className="relative px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <VariantLabel letter="C" name="Single-line statement" tone="cream" />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-korium text-5xl md:text-7xl lg:text-[112px] font-bold text-black leading-[0.9] tracking-tight"
        >
          Designed in Lagos.
          <br />
          Shipped <span className="text-orange">everywhere</span>.
        </motion.h2>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// VARIANT D — Vertical manifesto block
// ---------------------------------------------------------------------------

function VariantD() {
  const lines = [
    { text: 'I build collaborative tools.', dim: false },
    {
      text: 'At the intersection of design and engineering.',
      dim: false,
    },
    { text: 'On my own time.', dim: false },
  ]
  return (
    <section className="relative bg-black py-20 md:py-28">
      <div className="relative px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <VariantLabel letter="D" name="Vertical manifesto" tone="black" />
        <div className="space-y-4 md:space-y-5">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-korium text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-cream max-w-4xl"
            >
              {line.text}
            </motion.p>
          ))}
          <div className="pt-6">
            <span className="inline-flex items-center gap-2 font-geist-mono text-[11px] uppercase tracking-[0.32em] text-white/45">
              <span className="inline-block h-1.5 w-1.5 bg-orange" />
              Seye Alexander · 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
