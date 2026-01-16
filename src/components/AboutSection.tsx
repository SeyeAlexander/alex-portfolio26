import { motion } from 'framer-motion'
import { TechStack } from './TechStack'

// Animation variants
const fadeFromTop = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
}

const fadeFromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const paragraphVariant = {
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

// const techStackContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.6,
//     },
//   },
// }

export function AboutSection() {
  return (
    <section
      id="me"
      className="relative z-10 pt-10 pb-28 px-4 md:px-[20px] flex flex-col items-center bg-cream text-black"
    >
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Title - fades from top */}
        <motion.h2
          className="font-korium text-5xl md:text-[180px] font-bold text-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeFromTop}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          ABOUT ME
        </motion.h2>

        {/* Paragraphs - staggered fade from bottom */}
        <motion.div
          className="font-geist-mono text-base text-black/70 max-w-2xl mx-auto text-left space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          <motion.p variants={paragraphVariant}>
            I'm a{' '}
            <span className="text-black font-bold">Fullstack Developer</span>{' '}
            with a frontend focus, passionate about crafting accessible,
            performant, and detail-oriented user interfaces. I love building at
            the intersection of thoughtful design and robust engineering — where
            beautiful UI meets resilient systems.
          </motion.p>
          <motion.p variants={paragraphVariant}>
            Right now, I'm a{' '}
            <span className="text-orange font-bold">
              Senior Frontend Developer at EStation
            </span>
            , where I focus on architecting high-performance Next.js
            applications and building scalable design systems. Previously, I led
            frontend development at Neue World, creating platforms like Flozi
            and Layers.
          </motion.p>
          <motion.p variants={paragraphVariant}>
            In the past, I've worked across early-stage startups, remote product
            studios, and client-driven agencies, contributing to projects for
            organizations like ICCA Dubai and The Be Company UK.
          </motion.p>
          <motion.p variants={paragraphVariant}>
            When I'm not building something new, you'll probably find me
            refining a component, sketching a UX flow in Figma, or figuring out
            how to teach LLMs to think like engineers.
          </motion.p>
        </motion.div>

        {/* Tech Stack - fades from bottom with stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeFromBottom}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.5,
          }}
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
