import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MorphingGradientBox } from './MorphingGradientBox'

interface SiteLoaderProps {
  onComplete?: () => void
  duration?: number
}

export function SiteLoader({ onComplete, duration = 2800 }: SiteLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Qoreeb-style layout: OLUWASEYE | Gradient Box | ALEXANDER */}
          <div className="flex items-center gap-6 md:gap-10 lg:gap-14">
            {/* OLUWASEYE - Left side */}
            <motion.p
              className="font-geist-mono text-sm md:text-lg lg:text-xl font-light tracking-[0.25em] uppercase text-black/80"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
            >
              OLUWASEYE
            </motion.p>

            {/* Morphing Gradient Box - Center */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5,
              }}
            >
              {/* Responsive sizes */}
              <MorphingGradientBox size={100} className="md:hidden" />
              <MorphingGradientBox
                size={180}
                className="hidden md:block lg:hidden"
              />
              <MorphingGradientBox size={220} className="hidden lg:block" />
            </motion.div>

            {/* ALEXANDER - Right side */}
            <motion.p
              className="font-geist-mono text-sm md:text-lg lg:text-xl font-light tracking-[0.25em] uppercase text-black/80"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
            >
              ALEXANDER
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
