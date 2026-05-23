import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// ComponentDrawer
//
// Side panel pinned to the right edge of the viewport with equal margins on
// top, right, and bottom. All four corners rounded so it reads as a floating
// surface sliding out of the right edge — not a docked sheet.
//
// Tabs: preview / code / about.
// ---------------------------------------------------------------------------

// Width and margin tuned so the panel is comfortable without dominating wide
// screens. Both kept here so CleanLayout can use them to size the content
// shift on the left side.
export const DRAWER_WIDTH = 460
export const DRAWER_MARGIN = 14

type Tab = 'preview' | 'code' | 'about'

export type ComponentDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  tag: string
  description: string
  preview: React.ReactNode
  code: string
}

export function ComponentDrawer({
  open,
  onOpenChange,
  title,
  tag,
  description,
  preview,
  code,
}: ComponentDrawerProps) {
  const [tab, setTab] = useState<Tab>('preview')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    // modal={false} so body scroll + clicks on the page behind keep working.
    // The drawer floats on top but doesn't block the rest of /clean — users
    // can scroll to another component and tap its View button to swap the
    // drawer's contents without having to close it first.
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Content
              asChild
              onOpenAutoFocus={(event) => event.preventDefault()}
              onInteractOutside={(event) => event.preventDefault()}
              onPointerDownOutside={(event) => event.preventDefault()}
            >
              <motion.div
                initial={{ x: DRAWER_WIDTH + DRAWER_MARGIN + 40 }}
                animate={{ x: 0 }}
                exit={{ x: DRAWER_WIDTH + DRAWER_MARGIN + 40 }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 34,
                  mass: 0.85,
                }}
                style={{
                  width: DRAWER_WIDTH,
                  top: DRAWER_MARGIN,
                  right: DRAWER_MARGIN,
                  bottom: DRAWER_MARGIN,
                }}
                className="fixed z-50 flex flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white text-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#101012] dark:text-white"
              >
                {/* Header */}
                <header className="flex items-start justify-between gap-6 px-7 pb-5 pt-7">
                  <div className="space-y-1">
                    <p className="font-geist-mono text-[10px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                      {tag}
                    </p>
                    <Dialog.Title className="text-[22px] font-medium tracking-[-0.02em]">
                      {title}
                    </Dialog.Title>
                  </div>

                  <Dialog.Close
                    className="flex h-9 w-9 items-center justify-center rounded-full text-black/55 transition-colors hover:bg-black/5 hover:text-black dark:text-white/55 dark:hover:bg-white/8 dark:hover:text-white"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" strokeWidth={2.2} />
                  </Dialog.Close>
                </header>

                {/* Tabs — sharp, no pill. Active tab gets a thick short
                    underline that slides between tabs via layoutId. */}
                <div className="px-7">
                  <div className="inline-flex items-end gap-5 text-[12px]">
                    {(['preview', 'code', 'about'] as const).map((value) => {
                      const active = tab === value
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setTab(value)}
                          className={cn(
                            'relative inline-flex h-7 items-center capitalize font-geist-mono tracking-tight transition-colors',
                            active
                              ? 'text-black dark:text-white'
                              : 'text-black/45 hover:text-black/75 dark:text-white/45 dark:hover:text-white/75',
                          )}
                        >
                          <span>{value}</span>
                          {active ? (
                            <span
                              aria-hidden="true"
                              className="absolute -bottom-px left-0 right-0 h-[2px] bg-black dark:bg-white"
                            />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Body — sharp framed panel with crosshair corners. No
                    inner border-radius; the outer drawer already carries the
                    rounding. */}
                <div className="flex-1 overflow-hidden px-6 pb-6 pt-5">
                  <DrawerPanel>
                    {tab === 'preview' ? (
                      <div className="flex h-full items-center justify-center overflow-auto px-5 py-8">
                        <div className="w-full">{preview}</div>
                      </div>
                    ) : null}

                    {tab === 'code' ? (
                      <div className="relative h-full">
                        <button
                          type="button"
                          onClick={copy}
                          className="absolute right-3 top-3 z-10 inline-flex h-7 items-center gap-1.5 border border-black/15 bg-white/85 px-2.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-black/70 transition-colors hover:text-black dark:border-white/15 dark:bg-black/55 dark:text-white/75 dark:hover:text-white"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" strokeWidth={2.2} />
                              Copy
                            </>
                          )}
                        </button>
                        <pre className="h-full overflow-auto px-5 py-6 font-geist-mono text-[11.5px] leading-[1.7] text-black/80 dark:text-white/80">
                          <code>{code}</code>
                        </pre>
                      </div>
                    ) : null}

                    {tab === 'about' ? (
                      <div className="h-full overflow-auto px-5 py-6">
                        <p className="max-w-full whitespace-pre-line text-[13.5px] leading-7 text-black/70 dark:text-white/70">
                          {description}
                        </p>
                      </div>
                    ) : null}
                  </DrawerPanel>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}

// ---------------------------------------------------------------------------
// DrawerPanel — sharp inner panel with crosshair corners. Mirrors the
// vocabulary used by the TextFlow feature cards on the home page so the
// drawer's interior reads as part of the same architectural language.
// ---------------------------------------------------------------------------

function DrawerPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full border border-black/10 bg-black/[0.02] dark:border-white/12 dark:bg-white/[0.02]">
      {[
        '-top-[5px] -left-[5px]',
        '-top-[5px] -right-[5px]',
        '-bottom-[5px] -left-[5px]',
        '-bottom-[5px] -right-[5px]',
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute ${pos} z-10 flex h-2.5 w-2.5 items-center justify-center`}
        >
          <span className="absolute h-px w-full bg-black/55 dark:bg-white/55" />
          <span className="absolute h-full w-px bg-black/55 dark:bg-white/55" />
        </span>
      ))}
      <div className="h-full overflow-hidden">{children}</div>
    </div>
  )
}
