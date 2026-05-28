import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// BuildHeader
//
// Used at the top of each sub-build inside the "Built on my own time" stretch
// (Clean + Notes, Loupe, TextFlow). It is a single row: a big numbered marker
// on one side, the build's title stack (pill + name + optional subtitle) on
// the opposite side, both bottom-aligned. Same rhythm as the Experience
// section above. The rest of the build's content (panels, tech stack, cards,
// coverflow, etc.) sits BELOW the header at full container width, untouched.
//
// `numberSide` controls which side the big number lands on; the title stack
// always sits on the opposite side.
//   left  → 01 / 03 — number on the far left, title stack far right
//   right → 02      — title stack far left, number on the far right
// ---------------------------------------------------------------------------

export function BuildHeader({
  number,
  numberSide = 'left',
  children,
}: {
  number: string
  numberSide?: 'left' | 'right'
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex items-end justify-between gap-6 md:gap-12 ${
        numberSide === 'left' ? 'flex-row-reverse' : ''
      }`}
    >
      <div className="min-w-0">{children}</div>
      <AnimatedBuildNumber number={number} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// AnimatedBuildNumber
//
// Same scale + weight as Experience's AnimatedJobNumber so the two sections
// read as a family. The leading "0" drops in first, the trailing digit a beat
// later — small staggered entry, no busy choreography.
// ---------------------------------------------------------------------------

function AnimatedBuildNumber({ number }: { number: string }) {
  return (
    <div className="flex shrink-0 font-geist text-[100px] md:text-[150px] lg:text-[200px] font-bold leading-none text-deep-orange">
      <motion.span
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      >
        {number[0]}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4,
        }}
      >
        {number.slice(1)}
      </motion.span>
    </div>
  )
}
