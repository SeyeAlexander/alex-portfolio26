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
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
}

const paragraphVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
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
          viewport={{ margin: '-100px' }}
          variants={fadeFromTop}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          ABOUT ME
        </motion.h2>

        {/* Paragraphs - staggered fade from bottom */}
        <motion.div
          className="font-geist-mono text-base text-black/70 max-w-2xl mx-auto text-left space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={staggerContainer}
        >
          <motion.p variants={paragraphVariant}>
            I'm an{' '}
            <span className="text-black font-bold">
              experienced Software Engineer
            </span>{' '}
            focused on building high-impact products for a global user base. I
            thrive at the intersection of thoughtful design and robust
            engineering — where beautiful UI meets resilient, scalable systems.
          </motion.p>
          <motion.p variants={paragraphVariant}>
            Currently, I'm a{' '}
            <span className="text-orange font-bold">
              Senior Frontend Developer at EStation
            </span>
            , where I lead frontend architecture across multiple product
            initiatives — from terminal-grade POS systems to multi-tenant
            e-commerce engines. I manage code reviews, mentor developers, and
            drive technical decisions on modern patterns including optimistic
            UI, offline-first state, and LLM prompt engineering.
          </motion.p>
          <motion.p variants={paragraphVariant}>
            Previously, I led frontend development at Neue World, architecting
            platforms like Flozi (Notion-to-Webflow sync) and Layers
            (blockchain-integrated freelance platform). I've worked across
            startups, remote studios, and agencies — always focused on shipping
            software that matters.
          </motion.p>
          <motion.p variants={paragraphVariant}>
            When I'm not shipping features, you'll find me refining components,
            sketching UX flows in Figma, or figuring out how to teach LLMs to
            think like engineers.
          </motion.p>
        </motion.div>

        {/* Tech Stack - fades from bottom with stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={fadeFromBottom}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.25,
          }}
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
