// ---------------------------------------------------------------------------
// BuildsDivider
//
// Cream strip used to separate the two halves of the "Built on my own time"
// section — Studio cards above, the TextFlow ProjectsSection below. Compact
// height; crosshairs are smaller, numerous, and scattered at varied
// positions so the gap reads deliberate, not empty.
// ---------------------------------------------------------------------------

const CROSSHAIRS = [
  { left: '4%', top: '22%' },
  { left: '11%', top: '68%' },
  { left: '18%', top: '38%' },
  { left: '26%', top: '58%' },
  { left: '33%', top: '28%' },
  { left: '41%', top: '72%' },
  { left: '48%', top: '42%' },
  { left: '55%', top: '18%' },
  { left: '62%', top: '64%' },
  { left: '69%', top: '34%' },
  { left: '76%', top: '54%' },
  { left: '83%', top: '24%' },
  { left: '90%', top: '70%' },
  { left: '96%', top: '46%' },
  { left: '7%', top: '52%' },
  { left: '22%', top: '78%' },
  { left: '37%', top: '14%' },
  { left: '52%', top: '82%' },
  { left: '67%', top: '48%' },
  { left: '79%', top: '12%' },
  { left: '14%', top: '88%' },
  { left: '44%', top: '62%' },
  { left: '58%', top: '30%' },
  { left: '71%', top: '86%' },
  { left: '88%', top: '32%' },
  { left: '31%', top: '50%' },
  { left: '46%', top: '8%' },
  { left: '63%', top: '76%' },
  { left: '8%', top: '36%' },
  { left: '93%', top: '58%' },
  { left: '50%', top: '56%' },
  { left: '24%', top: '12%' },
  { left: '85%', top: '78%' },
] as const

function CrosshairMark({
  left,
  top,
}: {
  left: string
  top: string
}) {
  return (
    <span
      className="absolute flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left, top }}
    >
      <span className="absolute h-px w-full bg-black/50" />
      <span className="absolute h-full w-px bg-black/50" />
    </span>
  )
}

export function BuildsDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 h-14 md:h-16 bg-cream overflow-hidden"
    >
      {CROSSHAIRS.map((pos, i) => (
        <CrosshairMark key={i} left={pos.left} top={pos.top} />
      ))}
    </div>
  )
}
