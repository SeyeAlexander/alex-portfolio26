import { motion } from 'framer-motion'

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

export function ProjectsSection() {
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
          <div className="relative border border-white/20 bg-black">
            {/* Inner grid lines for inset effect */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/10" />

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16">
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
                    60%
                  </span>
                  <p className="font-geist-mono text-xs text-white/50 mt-1">
                    COMPLETE
                  </p>
                </div>
              </div>

              {/* Project Name */}
              <h3 className="font-korium text-6xl md:text-8xl lg:text-[120px] font-bold text-cream leading-none mb-6">
                TextFlow
              </h3>

              {/* Subtitle */}
              <p className="font-geist text-xl md:text-2xl text-white/80 mb-8 max-w-3xl">
                A Notion-like collaborative editor with real-time sync,
                conflict-free editing, and live cursors.
              </p>

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

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </motion.div>
      </div>
    </section>
  )
}
