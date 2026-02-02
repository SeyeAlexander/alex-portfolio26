import { motion } from 'framer-motion'
import { Github, ChevronLeft, ChevronRight, X, Globe } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const screenshots = [
  '/Screenshot 2026-02-02 at 00.50.05.png',
  '/Screenshot 2026-02-02 at 00.50.23.png',
  '/Screenshot 2026-02-02 at 00.50.40.png',
  '/Screenshot 2026-02-02 at 00.50.46.png',
  '/Screenshot 2026-02-02 at 00.50.54.png',
  '/Screenshot 2026-02-02 at 00.51.53.png',
  '/Screenshot 2026-02-02 at 00.52.11.png',
]

export function ProjectsSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )
  // const marqueeControls = useAnimationControls()

  // Start marquee animation
  // const startMarquee = () => {
  //   marqueeControls.start({
  //     x: '-50%',
  //     transition: {
  //       duration: 40,
  //       ease: 'linear',
  //       repeat: Infinity,
  //     },
  //   })
  // }

  // Handle modal navigation
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? screenshots.length - 1 : (prev as number) - 1,
      )
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === screenshots.length - 1 ? 0 : (prev as number) + 1,
      )
    }
  }

  return (
    <section id="projects" className="relative z-10 bg-black py-16 md:py-24">
      {/* Grid lines */}
      <div className="absolute left-[20px] inset-y-0 w-px bg-white/20" />
      <div className="absolute right-[20px] inset-y-0 w-px bg-white/20" />
      <div className="absolute top-0 left-[20px] right-[20px] h-px bg-white/20" />
      <div className="absolute bottom-0 left-[20px] right-[20px] h-px bg-white/20" />

      {/* Crosshairs */}
      {[
        'top-[-5px] left-[20px]',
        'top-[-5px] right-[9px]',
        'bottom-[-5px] left-[20px]',
        'bottom-[-5px] right-[9px]',
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 -translate-x-1/2 flex items-center justify-center`}
        >
          <div className="absolute w-full h-[1.5px] bg-white" />
          <div className="absolute h-full w-[1.5px] bg-white" />
        </div>
      ))}

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className="font-korium text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
          >
            PROJECTS
          </motion.h2>
          <p className="font-geist text-lg md:text-xl text-white/70 max-w-2xl">
            I build ambitious, no-fluff projects to stay sharp and push my
            limits. Here's what's currently in the forge.
          </p>
        </div>

        {/* Project Card - TextFlow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={fadeInUp}
          className="relative"
        >
          {/* Main inset card */}
          <div className="relative border border-white/20 bg-black overflow-hidden">
            {/* Inner grid lines for inset effect */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/10 pointer-events-none z-10" />

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16 relative z-20">
              {/* Top row: Status + Progress */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange animate-pulse" />
                  <span className="font-geist-mono text-xs text-orange uppercase tracking-widest">
                    In Development
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-geist-mono text-4xl md:text-5xl font-bold text-deep-orange">
                    80%
                  </span>
                  <p className="font-geist-mono text-xs text-white/50 mt-1">
                    COMPLETE
                  </p>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="mb-12">
                {/* Project Name */}
                <h3 className="font-korium text-6xl md:text-8xl lg:text-[100px] font-bold text-cream leading-none mb-6">
                  TextFlow
                </h3>

                {/* Subtitle / Philosophy Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="space-y-2">
                    <h4 className="font-geist text-white font-bold text-lg">
                      Zero to One
                    </h4>
                    <p className="font-geist-mono text-xs text-white/60 leading-relaxed">
                      Architected completely from the ground up. No boilerplate,
                      just pure, thoughtful engineering from day one.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-geist text-white font-bold text-lg">
                      AI-Driven Design
                    </h4>
                    <p className="font-geist-mono text-xs text-white/60 leading-relaxed">
                      Interface designed on the fly using LLMs. No Figma files.
                      Just rapid, iterative aesthetic layering.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-geist text-white font-bold text-lg">
                      Visuals via Nano Banana
                    </h4>
                    <p className="font-geist-mono text-xs text-white/60 leading-relaxed">
                      Leveraging Nano Banana for generating unique,
                      high-fidelity image assets to sell the vision.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-geist text-white font-bold text-lg">
                      System Mastery
                    </h4>
                    <p className="font-geist-mono text-xs text-white/60 leading-relaxed">
                      Showcasing deep integration knowledge: Database design,
                      Real-time sync, and Conflict resolution.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <a
                    href="https://textflow.seyealexander.dev/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-geist font-bold rounded-full hover:bg-cream transition-colors"
                  >
                    <Globe size={20} />
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/SeyeAlexander/TextFlow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-geist font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    'Next.js',
                    'TypeScript',
                    'React',
                    'Lexical',
                    'Supabase',
                    'Drizzle ORM',
                    'Yjs (CRDTs)',
                    'WebSockets',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="font-geist-mono text-xs px-3 py-1.5 border border-white/20 text-white/70 hover:text-orange hover:border-orange transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Technical Features */}
                <div className="border-t border-white/10 pt-8 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="border-l-2 border-orange pl-4">
                    <h4 className="font-geist text-sm font-bold text-white mb-1">
                      Block-Based Editor
                    </h4>
                    <p className="font-geist-mono text-xs text-white/50">
                      Custom Lexical implementation with rich content blocks
                    </p>
                  </div>
                  <div className="border-l-2 border-deep-orange pl-4">
                    <h4 className="font-geist text-sm font-bold text-white mb-1">
                      Real-Time Collaboration
                    </h4>
                    <p className="font-geist-mono text-xs text-white/50">
                      CRDTs for conflict-free sync + live cursor tracking
                    </p>
                  </div>
                  <div className="border-l-2 border-cream pl-4">
                    <h4 className="font-geist text-sm font-bold text-white mb-1">
                      PostgreSQL Backend
                    </h4>
                    <p className="font-geist-mono text-xs text-white/50">
                      Supabase + Drizzle ORM for type-safe queries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 md:px-10 lg:px-10 max-w-8xl mx-auto">
        {/* Marquee Section - Decoupled from card */}
        <div className="mt-12 md:mt-16 w-full overflow-hidden">
          {/* Marquee Track */}
          <div
            className="flex gap-6 hover:paused"
            style={{
              width: 'max-content',
              animation: 'marquee 60s linear infinite',
            }}
          >
            {/* Triple the array for extra safety on wide screens, ensuring seamless loop */}
            {[...screenshots, ...screenshots, ...screenshots].map(
              (src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  onClick={() =>
                    setSelectedImageIndex(idx % screenshots.length)
                  }
                  className="relative shrink-0 w-[400px] cursor-pointer group/image"
                >
                  <img
                    src={src}
                    alt={`TextFlow Screenshot ${idx}`}
                    className="w-full h-auto object-cover opacity-100 transition-opacity" // Ensure sharp by default
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-geist-mono bg-black/80 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                      View
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>

          <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-33.33%); }
                }
              `}</style>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog.Root
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && setSelectedImageIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none">
            <div className="relative w-full max-w-5xl flex flex-col items-center">
              {/* Close Button - more prominent */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-12 right-0 md:-right-12 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all border border-white/20"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Main Image */}
              {selectedImageIndex !== null && (
                <div className="relative w-full aspect-video md:aspect-auto md:max-h-[70vh] flex items-center justify-center bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={screenshots[selectedImageIndex]}
                    alt="Screenshot Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Navigation Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white hover:text-black text-white border border-white/10 backdrop-blur-md transition-all z-50"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white hover:text-black text-white border border-white/10 backdrop-blur-md transition-all z-50"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Thumbnails */}
              <div className="mt-8 flex gap-3 overflow-x-auto max-w-full pb-2 px-4 scrollbar-hide">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === selectedImageIndex
                        ? 'bg-orange w-12'
                        : 'bg-white/20 w-2 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
