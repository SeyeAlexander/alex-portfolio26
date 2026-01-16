import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Personal details data
const personalDetails = [
  { label: 'LOCATION', value: 'LAGOS, NIGERIA' },
  { label: 'FIELD', value: 'DESIGN & DEVELOPMENT' },
  { label: 'APPROACH', value: 'LESS BUT BETTER' },
  { label: 'CAREER', value: 'STARTUPS & AGENCIES' },
]

// Stats data
const stats = [
  {
    number: 20,
    suffix: '+',
    label: 'PROJECTS',
    description:
      'ENTERPRISE APPS, E-COMMERCE PLATFORMS, AND PRODUCTIVITY PRODUCTS.',
  },
  {
    number: 5,
    suffix: '+',
    label: 'YEARS EXPERIENCE',
    description: 'REFINING PROCESS, CLARITY, AND PERFORMANCE-DRIVEN CODE.',
  },
  {
    number: 95,
    suffix: '%',
    label: 'CLIENT SATISFACTION',
    description:
      'LONG-TERM RELATIONSHIPS, STRONG COMMUNICATION, AND CLEAR DELIVERY.',
  },
  {
    number: 5,
    suffix: '+',
    label: 'AVG RATING',
    description:
      'TRUSTED BY FOUNDERS, CREATIVES & TEAMS ACROSS DIFFERENT INDUSTRIES.',
  },
]

// Count-up animation hook with repeating capability
function useCountUp(end: number, duration: number = 1500, delay: number = 0) {
  const [count, setCount] = useState(0)
  const [triggerCount, setTriggerCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const hasInitialAnimated = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Animation function
  const runAnimation = (delayMs: number = 0) => {
    setTimeout(() => {
      setCount(0)
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(end * easeOut)

        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delayMs)
  }

  // Initial animation when coming into view
  useEffect(() => {
    if (isInView && !hasInitialAnimated.current) {
      hasInitialAnimated.current = true
      runAnimation(delay)

      // Start interval for repeated animations (first at 20s, then every 10s)
      const firstTimeout = setTimeout(() => {
        setTriggerCount((c) => c + 1)

        // Then every 10 seconds
        intervalRef.current = setInterval(() => {
          setTriggerCount((c) => c + 1)
        }, 10000)
      }, 20000)

      return () => {
        clearTimeout(firstTimeout)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [isInView, delay, end])

  // Handle repeated animations with stagger
  useEffect(() => {
    if (triggerCount > 0 && isInView) {
      runAnimation(delay)
    }
  }, [triggerCount, delay, end, isInView])

  // Reset when leaving view
  useEffect(() => {
    if (!isInView && hasInitialAnimated.current) {
      hasInitialAnimated.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isInView])

  return { count, ref }
}

// Animated number component with stagger index
function AnimatedNumber({
  value,
  suffix,
  className,
  staggerIndex = 0,
}: {
  value: number
  suffix: string
  className?: string
  staggerIndex?: number
}) {
  // Stagger delay: 0, 400ms, 800ms, 1200ms for indices 0-3
  const { count, ref } = useCountUp(value, 1500, staggerIndex * 400)

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section id="stats" className="relative bg-black text-white">
      {/* Grid Background - continues from Hero */}
      <GridBackground />

      {/* Personal Details Bar */}
      <PersonalDetailsBar />

      {/* Stats Grid */}
      <StatsGrid />
    </section>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Vertical Lines - same positions as Hero */}
      <div className="absolute left-[20px] inset-y-0 w-px bg-white/20" />
      <div className="absolute left-1/4 inset-y-0 w-px bg-white/20" />
      <div className="absolute left-1/2 inset-y-0 w-px bg-white/20" />
      <div className="absolute left-3/4 inset-y-0 w-px bg-white/20" />
      <div className="absolute right-[20px] inset-y-0 w-px bg-white/20" />
    </div>
  )
}

function Crosshair({ className }: { className?: string }) {
  return (
    <div
      className={`w-3 h-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${className}`}
    >
      <div className="absolute w-full h-[1.5px] bg-white" />
      <div className="absolute h-full w-[1.5px] bg-white" />
    </div>
  )
}

function PersonalDetailsBar() {
  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-50px' }}
      variants={staggerContainer}
    >
      {/* Bottom horizontal line */}
      <div className="absolute bottom-0 left-[20px] right-[20px] h-px bg-white/20" />

      {/* Crosshairs - Bottom line (5 points) */}
      <Crosshair className="absolute bottom-[-10px] left-[20px]" />
      <Crosshair className="absolute bottom-[-10px] left-1/4" />
      <Crosshair className="absolute bottom-[-10px] left-1/2" />
      {/* <Crosshair className="absolute bottom-[-10px] left-1/2" /> */}
      <Crosshair className="absolute bottom-[-10px] left-3/4" />
      <Crosshair className="absolute bottom-[-10px] right-[9px]" />

      {/* Content Grid - 4 columns */}
      <div className="relative grid grid-cols-4 py-6 md:py-8">
        {personalDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            className="px-6 md:px-8"
            style={{
              // Align content to left of each column with proper offsets
              marginLeft: index === 0 ? 'calc(20px - 1.5rem)' : 0,
            }}
            variants={fadeInUp}
          >
            <p className="font-geist-mono text-[10px] md:text-xs text-white/50 tracking-widest mb-1">
              {detail.label}
            </p>
            <p className="font-geist-mono text-xs md:text-sm text-white tracking-wide">
              {detail.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function StatsGrid() {
  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '-100px' }}
      variants={staggerContainer}
    >
      {/* Row 1: Stats 0 (col 1) and Stats 1 (col 3-4) */}
      <div className="relative">
        {/* Stat Box 1 - Column 1 (left-[20px] to left-1/4) */}
        <motion.div
          className="absolute left-[20px] w-[calc(25%-20px)] aspect-square"
          variants={fadeInUp}
        >
          {/* Box border */}
          <div className="absolute inset-0 border-b  border-white/20" />
          {/* Content */}
          <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
            <div className="flex gap-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <p className="font-geist text-6xl md:text-8xl lg:text-[120px] font-bold leading-none -ml-1">
              <AnimatedNumber
                value={stats[0].number}
                suffix={stats[0].suffix}
                staggerIndex={0}
              />
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white tracking-widest mt-4 mb-2">
              {stats[0].label}
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white/50 tracking-wide leading-relaxed max-w-[200px]">
              {stats[0].description}
            </p>
          </div>
        </motion.div>

        {/* Stat Box 2 - Column 3 (left-1/2 to left-3/4) */}
        <motion.div
          className="absolute left-1/2 w-1/4 aspect-square"
          variants={fadeInUp}
        >
          {/* Box border */}
          <div className="absolute inset-0 border-b border-white/20" />
          <Crosshair className="absolute bottom-[-280px] left-0" />
          {/* Content */}
          <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
            <div className="flex gap-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <p className="font-geist text-6xl md:text-8xl lg:text-[120px] font-bold leading-none -ml-1">
              <AnimatedNumber
                value={stats[1].number}
                suffix={stats[1].suffix}
                staggerIndex={1}
              />
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white tracking-widest mt-4 mb-2">
              {stats[1].label}
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white/50 tracking-wide leading-relaxed max-w-[200px]">
              {stats[1].description}
            </p>
          </div>
        </motion.div>

        {/* Spacer to maintain row height */}
        <div className="w-1/4 aspect-square" />
      </div>

      {/* Row 2: Stats 2 (col 2) and Stats 3 (col 4) - offset lower */}
      <div className="relative -mt-[10%]">
        {/* Stat Box 3 - Column 2 (left-1/4 to left-1/2) */}
        <motion.div
          className="absolute left-1/4 w-1/4 aspect-[1/1.15]"
          variants={fadeInUp}
        >
          {/* Box border */}
          <div className="absolute inset-0 border-b border-white/20" />
          {/* Content */}
          <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
            <div className="flex gap-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <p className="font-geist text-6xl md:text-8xl lg:text-[120px] font-bold leading-none -ml-1">
              <AnimatedNumber
                value={stats[2].number}
                suffix={stats[2].suffix}
                staggerIndex={2}
              />
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white tracking-widest mt-4 mb-2">
              {stats[2].label}
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white/50 tracking-wide leading-relaxed max-w-[200px]">
              {stats[2].description}
            </p>
          </div>
        </motion.div>

        {/* Stat Box 4 - Column 4 (left-3/4 to right-[20px]) */}
        <motion.div
          className="absolute left-3/4 w-[calc(25%-20px)] aspect-[1/1.15]"
          variants={fadeInUp}
        >
          {/* Box border */}
          <div className="absolute inset-0 border-b border-white/20" />
          {/* Content */}
          <div className="relative p-6 md:p-8 h-full flex flex-col justify-end">
            <div className="flex gap-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <p className="font-geist text-6xl md:text-8xl lg:text-[120px] font-bold leading-none -ml-1">
              <AnimatedNumber
                value={stats[3].number}
                suffix={stats[3].suffix}
                staggerIndex={3}
              />
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white tracking-widest mt-4 mb-2">
              {stats[3].label}
            </p>
            <p className="font-geist-mono text-[10px] md:text-xs text-white/50 tracking-wide leading-relaxed max-w-[200px]">
              {stats[3].description}
            </p>
          </div>
        </motion.div>

        {/* Spacer to maintain row height */}
        <div className="w-1/4 aspect-[1/1.15] ml-1/4" />
      </div>

      {/* Bottom spacing */}
      <div className="h-16" />
    </motion.div>
  )
}
