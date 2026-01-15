import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="min-h-screen bg-[#E5E5DD] flex flex-col">
      {/* Header with Logo */}
      <header className="p-6">
        <Link to="/" className="inline-block">
          <Logo />
        </Link>
      </header>

      {/* Main Content - Centered Name */}
      <main className="flex-1 flex items-center justify-center">
        <NameDisplay />
      </main>
    </div>
  )
}

/**
 * Logo component - "SEYE" with "SE" on top of "YE"
 * Uses T1-Korium font (font-korium class)
 */
function Logo() {
  return (
    <div className="font-korium leading-none select-none">
      <div className="text-xl font-bold tracking-tight text-foreground">SE</div>
      <div className="text-xl font-bold tracking-tight text-foreground">YE</div>
    </div>
  )
}

/**
 * NameDisplay component - "Seye Alexander" with staggered layout
 * "Seye" is higher and aligned left
 * "Alexander" is lower and aligned right, with 'A' starting after the last letter of "Seye"
 */
function NameDisplay() {
  return (
    <div className="font-korium select-none">
      {/* Container for the staggered name layout */}
      <div className="relative">
        {/* "Seye" - upper, aligned left */}
        <div className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground">
          Seye
        </div>
        {/* "Alexander" - lower, shifted right so 'A' starts after "Seye" */}
        <div
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground"
          style={{
            marginLeft: 'calc(4ch + 0.15em)', // 4 characters ("Seye") + small space
          }}
        >
          Alexander
        </div>
      </div>
    </div>
  )
}
