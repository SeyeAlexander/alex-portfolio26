import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="min-h-screen bg-cream relative overflow-hidden flex flex-col">
      {/* Grid Background */}
      <GridBackground />

      {/* Header containing Logo */}
      <header className="relative z-10 pt-4 px-4 md:pt-5 md:px-[20px]">
        <div className="pl-4">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col pt-64">
        {/* Name Display - Staggered */}
        <div className="flex-1 flex items-center justify-center ">
          <NameDisplay />
        </div>

        {/* Professional Summary - Positioned between 4th and 5th grid lines */}
        <div className="absolute top-[51%] right-3 pl-4 w-1/4">
          <ShortSummary />
        </div>

        {/* Info Rectangle - Integrated into the bottom left grid area */}
        <div className="absolute bottom-[20px] h-14 left-[20px] right-[75%] z-20">
          <InfoRectangle />
        </div>
      </main>
    </div>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Vertical Lines */}
      <div className="absolute left-[20px] inset-y-0 w-px bg-grid" />
      <div className="absolute left-1/4 inset-y-0 w-px bg-grid" />
      <div className="absolute left-1/2 inset-y-0 w-px bg-grid" />
      <div className="absolute left-3/4 inset-y-0 w-px bg-grid" />
      <div className="absolute right-[20px] inset-y-0 w-px bg-grid" />

      {/* Horizontal Lines */}
      {/* Line 1: End-to-end under SE YE logo */}
      <div className="absolute top-[75px] inset-x-0 h-px bg-grid" />

      {/* Crosshairs for Line 1 intersection with Margin Lines */}
      <Crosshair className="absolute top-[75px] left-[20px]" />
      <Crosshair className="absolute top-[75px] right-[9px]" />

      {/* Lines 2 & 3: Define the info rectangle in bottom left */}
      <div className="absolute bottom-[65px] left-[20px] right-[75%] h-px bg-grid" />
      <div className="absolute bottom-[20px] left-[20px] right-[75%] h-px bg-grid" />

      {/* Crosshairs for the rectangle corners */}
      <Crosshair className="absolute bottom-[64px] left-[20px]" />
      <Crosshair className="absolute bottom-[64px] left-[25%]" />
      <Crosshair className="absolute bottom-[9px] left-[20px]" />
      <Crosshair className="absolute bottom-[9px] left-[25%]" />
    </div>
  )
}

function Crosshair({ className }: { className?: string }) {
  return (
    <div
      className={`w-3 h-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${className}`}
    >
      <div className="absolute w-full h-[1.5px] bg-black" />
      <div className="absolute h-full w-[1.5px] bg-black" />
    </div>
  )
}

function Logo() {
  return (
    <div className="font-korium select-none text-xl md:text-2xl leading-5 tracking-wider text-orange font-extrabold">
      <div>SE</div>
      <div>YE</div>
    </div>
  )
}

function NameDisplay() {
  return (
    <div className="font-korium select-none text-black tracking-wide">
      <div className="relative text-5xl md:text-8xl lg:text-[200px] leading-tight font-bold">
        <p className="-mb-8 lg:-mb-14">SEYE</p>
        <p
          style={{
            marginLeft: 'calc(4ch + 0.1em)',
          }}
        >
          ALEXANDER
        </p>
      </div>
    </div>
  )
}

function ShortSummary() {
  return (
    <div className="font-geist-mono text-xs md:text-sm leading-relaxed text-black/60 max-w-xs">
      <p>
        <span className="text-black font-bold">
          Fullstack Developer at EStation
        </span>{' '}
        architecting high-performance apps. I build{' '}
        <span className="text-black font-bold">collaborative tools</span> at the
        intersection of{' '}
        <span className="text-black font-bold">design and engineering</span>.
        Driven by thoughtful design.
      </p>
    </div>
  )
}

function InfoRectangle() {
  return (
    <div className="bg-deep-orange text-white w-full h-full flex items-center justify-center gap-10">
      <div className="font-korium text-2xl md:text-5xl font-bold">S</div>
      <div className="font-geist-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-tight font-medium">
        Software Engineer
      </div>
    </div>
  )
}
