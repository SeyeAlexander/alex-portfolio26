import { TechStack } from './TechStack'

export function AboutSection() {
  return (
    <section
      id="me"
      className="relative z-10 py-32 px-4 md:px-[20px] flex flex-col items-center bg-cream text-black"
    >
      <div className="max-w-4xl w-full text-center space-y-12">
        <h2 className="font-korium text-5xl md:text-[180px] font-bold text-black">
          ABOUT ME
        </h2>

        <div className="font-geist-mono text-base text-black/70 max-w-2xl mx-auto text-left space-y-6">
          <p>
            I'm a{' '}
            <span className="text-black font-bold">Fullstack Developer</span>{' '}
            with a frontend focus, passionate about crafting accessible,
            performant, and detail-oriented user interfaces. I love building at
            the intersection of thoughtful design and robust engineering — where
            beautiful UI meets resilient systems.
          </p>
          <p>
            Right now, I'm a{' '}
            <span className="text-orange font-bold">
              Senior Frontend Developer at EStation
            </span>
            , where I focus on architecting high-performance Next.js
            applications and building scalable design systems. Previously, I led
            frontend development at Neue World, creating platforms like Flozi
            and Layers.
          </p>
          <p>
            In the past, I've worked across early-stage startups, remote product
            studios, and client-driven agencies, contributing to projects for
            organizations like ICCA Dubai and The Be Company UK.
          </p>
          <p>
            When I'm not building something new, you'll probably find me
            refining a component, sketching a UX flow in Figma, or figuring out
            how to teach LLMs to think like engineers.
          </p>
        </div>

        <div>
          <TechStack />
        </div>
      </div>
    </section>
  )
}
