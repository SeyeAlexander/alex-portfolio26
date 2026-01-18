import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MorphingGradientBoxProps {
  className?: string
  size?: number
}

// Multiple color palettes that cycle
const colorPalettes = [
  // Orange/Coral theme
  {
    bg: '#e5e5dd',
    colors: [
      { r: 255, g: 85, b: 0 }, // orange #ff5500
      { r: 216, g: 67, b: 21 }, // deep-orange #d84315
      { r: 255, g: 136, b: 68 }, // light-orange #ff8844
      { r: 229, g: 229, b: 221 }, // cream #e5e5dd
      { r: 255, g: 204, b: 153 }, // peach #ffcc99
    ],
  },
  // Deep red/black theme
  {
    bg: '#1a1a1a',
    colors: [
      { r: 139, g: 0, b: 0 }, // dark red #8b0000
      { r: 50, g: 50, b: 50 }, // charcoal #323232
      { r: 180, g: 30, b: 30 }, // crimson #b41e1e
      { r: 20, g: 20, b: 20 }, // near-black #141414
      { r: 100, g: 20, b: 20 }, // maroon #641414
    ],
  },
]

// Individual gradient layer component
function GradientLayer({
  size,
  palette,
  isVisible,
}: {
  size: number
  palette: (typeof colorPalettes)[0]
  isVisible: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const { colors, bg } = palette

    const blobs = colors.map((color, i) => ({
      x: Math.random() * size,
      y: Math.random() * size,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: size * 0.4 + Math.random() * size * 0.2,
      color,
      phase: i * (Math.PI / colors.length),
    }))

    let animationId: number

    const animate = () => {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, size, size)

      blobs.forEach((blob) => {
        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < 0 || blob.x > size) blob.vx *= -1
        if (blob.y < 0 || blob.y > size) blob.vy *= -1

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius,
        )

        const { r, g, b } = blob.color
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.85)`)
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.35)`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [size, palette])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 block"
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
  )
}

export function MorphingGradientBox({
  className = '',
  size = 180,
}: MorphingGradientBoxProps) {
  const [paletteIndex, setPaletteIndex] = useState(0)

  // Cycle through palettes every 1.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % colorPalettes.length)
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      }}
    >
      {/* Render both layers, fade between them */}
      {colorPalettes.map((palette, index) => (
        <GradientLayer
          key={index}
          size={size}
          palette={palette}
          isVisible={index === paletteIndex}
        />
      ))}
    </motion.div>
  )
}
