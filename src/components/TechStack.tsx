export function TechStack({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? 'text-cream' : 'text-black'
  const opacity = theme === 'dark' ? 'opacity-80' : 'opacity-60'

  return (
    <div className="flex flex-col items-center gap-6 font-korium tracking-widest text-lg md:text-2xl uppercase select-none">
      {/* Upper Row - Wider */}
      <div
        className={`flex flex-wrap justify-center gap-x-12 gap-y-4 ${textColor}`}
      >
        <span>React</span>
        <span>shadcn</span>
        <span>Cursor</span>
        <span>PostgreSQL</span>
        <span>Node.js</span>
        <span>Vite</span>
        <span>Tailwind</span>
        <span>TypeScript</span>
      </div>

      {/* Lower Row */}
      <div
        className={`flex flex-wrap justify-center gap-x-12 gap-y-4 ${textColor} ${opacity}`}
      >
        <span>Supabase</span>
        <span>Cloudflare</span>
        <span>Figma</span>
        <span>Notion</span>
        <span>Drizzle</span>
      </div>
    </div>
  )
}
