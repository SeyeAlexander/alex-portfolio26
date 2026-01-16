import { TechStack } from './TechStack'

export function ResumeSection() {
  return (
    <section
      id="resume"
      className="relative z-10 py-32 px-4 md:px-[20px] flex flex-col items-center bg-cream"
    >
      <div className="max-w-4xl w-full text-center space-y-12">
        <h2 className="font-korium text-5xl md:text-7xl font-bold text-black tracking-tighter">
          RESUME
        </h2>
        <p className="font-geist-mono text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Senior Frontend Developer specializing in high-performance
          applications, architectural design, and scalable UI systems.
          <br />
          <br />
          <span className="text-black font-semibold">Experience:</span> EStation
          (Senior Frontend), Neue World (Frontend Lead).
          <br />
          <br />
          <span className="text-orange font-bold uppercase tracking-wider text-sm">
            Projects in construction:
          </span>
          <br />
          <span className="text-black font-medium">
            Layers, Flozi, BEC, IRCG, E-CMS, B2C, B2C-POS
          </span>
        </p>

        <div className="pt-16">
          <TechStack />
        </div>
      </div>
    </section>
  )
}
