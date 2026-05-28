// ---------------------------------------------------------------------------
// BuildsDivider
//
// Divider strip used between sub-builds inside the "Built on my own time"
// stretch. All-black to blend with the surrounding canvas; only the dense
// scatter of tiny white crosshairs reads, so the strip feels like a quiet
// architectural ribbon rather than a coloured break. Used twice: between
// Clean + Notes and Loupe, and between Loupe and TextFlow.
// ---------------------------------------------------------------------------

// Deterministic golden-angle-ish spread so the crosshair scatter looks
// organic but stays SSR-consistent across reloads.
const CROSSHAIRS: { left: string; top: string }[] = Array.from(
  { length: 64 },
  (_, i) => {
    const left = (i * 137.5) % 100
    const top = ((i * 73) % 80) + 10
    return { left: `${left.toFixed(1)}%`, top: `${top.toFixed(1)}%` }
  },
)

function CrosshairMark({ left, top }: { left: string; top: string }) {
  // Smaller bounding box than the previous cream strip (h-2 → h-1.5) and
  // lower opacity hairlines so each + reads as a thinner, more delicate tick.
  return (
    <span
      aria-hidden="true"
      className="absolute flex h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left, top }}
    >
      <span className="absolute h-px w-full bg-white/40" />
      <span className="absolute h-full w-px bg-white/40" />
    </span>
  )
}

export function BuildsDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 h-14 md:h-16 overflow-hidden bg-black"
    >
      {CROSSHAIRS.map((pos, i) => (
        <CrosshairMark key={i} left={pos.left} top={pos.top} />
      ))}
    </div>
  )
}
