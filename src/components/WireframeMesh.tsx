import { useMemo } from 'react'

interface WireframeMeshProps {
  color?: string
  className?: string
}

export function WireframeMesh({
  color = '#000000',
  className = '',
}: WireframeMeshProps) {
  const width = 1600
  const height = 800

  const rows = 40
  const cols = 100
  const amplitude = 150

  const paths = useMemo(() => {
    const lines: string[] = []

    for (let r = 0; r <= rows; r++) {
      const rNorm = r / rows
      const yBase = height * (0.05 + rNorm * 0.95)

      let d = ''

      for (let c = 0; c <= cols; c++) {
        const cNorm = c / cols

        // X with slight perspective
        const xBase = cNorm * width
        const xOffset = (cNorm - 0.5) * (1 - rNorm) * (width * 0.15)
        const x = xBase - xOffset

        // Multiple overlapping wave functions for undulating terrain
        const wave1 = Math.sin(cNorm * Math.PI * 3 + rNorm * 4) * 0.4
        const wave2 = Math.sin(cNorm * Math.PI * 5 - rNorm * 2) * 0.25
        const wave3 = Math.cos(cNorm * Math.PI * 7 + rNorm * 6) * 0.15

        // Mountain bumps
        const dist1 = Math.sqrt(
          Math.pow(cNorm - 0.3, 2) + Math.pow(rNorm - 0.5, 2) * 0.5,
        )
        const bump1 = Math.max(0, 1 - dist1 * 2.5)

        const dist2 = Math.sqrt(
          Math.pow(cNorm - 0.6, 2) + Math.pow(rNorm - 0.45, 2) * 0.5,
        )
        const bump2 = Math.max(0, 1 - dist2 * 2.8) * 0.8

        const dist3 = Math.sqrt(
          Math.pow(cNorm - 0.85, 2) + Math.pow(rNorm - 0.55, 2) * 0.5,
        )
        const bump3 = Math.max(0, 1 - dist3 * 3.5) * 0.6

        // High-frequency noise
        const noise = Math.sin(cNorm * 40 + rNorm * 15) * 0.08

        // Combine everything
        const waves = wave1 + wave2 + wave3
        const bumps = bump1 + bump2 + bump3
        const zElevation = (waves * 0.3 + bumps + noise * bumps) * amplitude

        const y = yBase - zElevation

        if (c === 0) {
          d += `M ${x.toFixed(1)} ${y.toFixed(1)}`
        } else {
          d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
        }
      }
      lines.push(d)
    }
    return lines
  }, [])

  return (
    <div
      className={`absolute pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
            opacity={0.15 + (i / rows) * 0.5}
          />
        ))}
      </svg>
      {/* Gradient fade at bottom */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(to top, #e5e5dd 0%, #e5e5dd 10%, transparent 50%)',
        }}
      />
    </div>
  )
}
