import { createFileRoute } from '@tanstack/react-router'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { CleanLayout } from '@/components/clean/CleanLayout'
import { SoundTester } from '@/components/clean/SoundTester'

export const Route = createFileRoute('/notes')({
  head: () => ({
    meta: [
      { title: 'Notes | Seye Alexander' },
      {
        name: 'description',
        content:
          'Notes is Seye Alexander’s minimal writing space for UI patterns, AI ideas, product thinking, and visual references.',
      },
    ],
  }),
  component: NotesPage,
})

function NotesPage() {
  const [activeNote, setActiveNote] = useState('sound')
  const selectedNote = NOTES.find((note) => note.id === activeNote) ?? NOTES[0]

  return (
    <CleanLayout active="notes" title="notes" enableSunnyMode>
      <section className="space-y-6">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
          Notes
        </p>
        <h2 className="max-w-2xl text-2xl font-medium leading-[1.18] tracking-[-0.03em]">
          A small collection of things I want to write more about.
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-black/62 dark:text-white/62">
          List first, detail second. Click a note and the full entry appears
          on the right.
        </p>
      </section>

      <section className="grid gap-10 border-t border-black/10 pt-10 dark:border-white/10 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <div className="space-y-3">
            {NOTES.map((note) => {
              const active = selectedNote.id === note.id
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setActiveNote(note.id)}
                  className="block w-full text-left"
                >
                  <div className="space-y-1">
                    <p
                      className={
                        'font-geist-mono text-[10px] uppercase tracking-[0.24em] ' +
                        (active
                          ? 'text-black/70 dark:text-white/70'
                          : 'text-black/35 dark:text-white/35')
                      }
                    >
                      {note.label}
                    </p>
                    <p
                      className={
                        active
                          ? 'text-[13px] leading-snug text-black dark:text-white'
                          : 'text-[13px] leading-snug text-black/45 transition-colors lg:hover:text-black dark:text-white/45 dark:lg:hover:text-white'
                      }
                    >
                      {note.shortTitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        <article className="space-y-8">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-geist-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                {selectedNote.label} · {selectedNote.tag}
              </p>
              <p className="font-geist-mono text-[11px] tracking-[0.16em] text-black/40 dark:text-white/40">
                {selectedNote.date}
              </p>
            </div>
            <h3 className="max-w-2xl text-[28px] font-medium leading-[1.18] tracking-[-0.03em]">
              {selectedNote.title}
            </h3>
            <p className="max-w-2xl text-[13px] leading-7 text-black/62 dark:text-white/62">
              {selectedNote.subtitle}
            </p>
          </header>

          <div className="max-w-2xl space-y-5 text-[14px] leading-7 text-black/78 dark:text-white/78">
            {selectedNote.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {selectedNote.id === 'sound' ? <SoundTester /> : null}

          <div className="flex justify-end pt-6 lg:hidden">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              aria-label="Scroll to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/90 text-black/70 shadow-sm transition-colors active:scale-[0.97] lg:hover:border-black/30 lg:hover:text-black dark:border-white/15 dark:bg-black/55 dark:text-white/75 dark:lg:hover:text-white"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </article>
      </section>
    </CleanLayout>
  )
}

const NOTES = [
  {
    id: 'sound',
    label: 'Note 001',
    date: 'Feb 14, 2026',
    title: 'Why click sounds might deserve a comeback',
    shortTitle: 'Sound clicks',
    tag: 'Audio / Interaction',
    subtitle:
      'A restrained argument for bringing subtle interface sound back into modern web design.',
    paragraphs: [
      'A good click sound can make an interface feel more physical. Not because it copies the real world perfectly, but because it confirms intent in a way the eye does not always catch. The best examples are small and dry. More like punctuation than music.',
      'This matters most in interfaces with motion. When something slides, morphs, expands, or settles into place, a tiny sound can reinforce the transition and make the action feel complete. That is especially useful when the interaction is fast and the user needs confidence that something actually happened.',
      'The problem is not sound itself. The problem is noisy sound, repeated sound, or sound that fights the tone of the product. Like animation, it works when it is restrained. A soft tap for an important toggle or a view transition can feel thoughtful. A sound on everything feels cheap almost immediately.',
      'I like it most when the user stays in control. If sound is present, it should be easy to mute, remembered across sessions, and used only where it improves feedback. Done that way, it can make web interfaces feel a little more alive again.',
    ],
  },
  {
    id: 'motion',
    label: 'Note 002',
    date: 'Mar 03, 2026',
    title: 'Animation should finish a thought',
    shortTitle: 'Motion as clarity',
    tag: 'Motion / Product Feel',
    subtitle:
      'Small motion choices matter most when they help the user understand completion and change.',
    paragraphs: [
      'The interactions I tend to like most are the ones that clarify what just happened. Motion should help the user complete the sentence in their head, not interrupt it.',
      'That usually means shorter durations, cleaner easing, and a very clear relationship between the state before and the state after.',
      'A good transition does not exist to prove that the interface is modern. It exists to reduce uncertainty. If a panel opens, the motion should explain where it came from. If a state changes, the movement should make the update feel inevitable rather than arbitrary. Users do not usually describe that as animation quality. They describe it as the product feeling easy.',
      'This is why restraint matters more than quantity. One well-timed movement that signals continuity is more valuable than six decorative flourishes. Motion works best when it is attached to structure: position, hierarchy, ownership, and completion. Without that, it quickly becomes atmosphere without meaning.',
      'I also think timing is where taste shows up most. The difference between something feeling sharp and something feeling sluggish is often only a small adjustment. Slightly faster out, slightly softer in, slightly less bounce. Those details decide whether the interface feels confident or unsure of itself.',
      'The standard I keep coming back to is simple: when the motion ends, does the screen feel more understandable than it did before? If yes, the animation did its job. If not, it is probably just decoration asking for attention.',
    ],
  },
  {
    id: 'restraint',
    label: 'Note 003',
    date: 'Apr 18, 2026',
    title: 'Minimal interfaces still need a point of view',
    shortTitle: 'Minimalism and taste',
    tag: 'Design / Restraint',
    subtitle:
      'Minimal work still has to communicate identity through spacing, type, and interaction rhythm.',
    paragraphs: [
      'Minimal is not the absence of decisions. It is the result of making enough decisions that very little needs to remain on screen.',
      'What makes a sparse interface memorable is usually typography, spacing, timing, and how interactions are revealed rather than explained all at once.',
      'That is where taste enters the conversation. A clean interface is not automatically a thoughtful one. Stripping things away can leave clarity behind, but it can also leave emptiness behind. The difference is whether the remaining pieces still feel considered in rhythm, proportion, and character.',
      'I like minimal work that still shows signs of handcraft. A line breaks in the right place. The spacing relaxes exactly where the content needs room. A button has the right weight, not because it is loud, but because it belongs to the sentence around it. The interface feels quiet, but not generic.',
      'There is also a misconception that polished work must announce itself through complexity. I think the opposite is often true. Fine craft tends to feel natural enough that people stop noticing it as a separate layer. They simply feel that the page is calm, readable, and trustworthy. That reaction is often the result of many tiny edits, not a single dramatic move.',
      'So when I say I like clean interfaces, I do not mean barebones for the sake of being barebones. I mean edited, specific, and resolved. I mean work where every remaining element earns its place and the overall experience suggests that someone cared about the details long after the basic layout was already working.',
      'That kind of minimalism is harder than excess because there is less to hide behind. The work has to stand on typography, spacing, tempo, and judgment. When it does, even a very sparse interface can still carry identity, warmth, and a point of view strong enough to be remembered.',
    ],
  },
  {
    id: 'shipping',
    label: 'Note 004',
    date: 'May 22, 2026',
    title: 'Notes I leave myself before shipping',
    shortTitle: 'Before shipping',
    tag: 'Craft / Workflow',
    subtitle:
      'A small checklist I run through quietly before pushing a component or a page.',
    paragraphs: [
      'I have started keeping a short list in my head that I run through before I push almost anything. It is not a process. It is closer to a set of questions I have learned to ask myself, usually after I have already convinced myself the work is done.',
      'The first one is the easiest to skip. Does this look the same on a phone? Not just functionally, but in feel. A pill that reads as elegant at 1440px can look cramped or oversized at 390px, and that gap is where polished work quietly falls apart. I check the smallest screen first now, not last.',
      'The second is about motion. Is anything moving that does not need to? Hover states, entrance animations, scroll-linked tricks. They are easy to add and hard to subtract once they are in. If a motion does not change how the user understands the interface, I take it out before anyone else sees it.',
      'The third is about silence. Have I left enough space around the content for it to breathe, or did I fill every gap because empty space made me nervous? The answer is usually that I filled too much. Most of my best edits late at night are deletions.',
      'The fourth is about copy. Is the smallest text on the page still considered? Microcopy is where you can tell whether someone was paying attention. Labels, empty states, error messages, the tag under a card. Those are the lines that decide whether the product reads as thoughtful or just well-designed.',
      'The last one is about taste, and it is the one I cannot really teach. I try to ask whether I would still respect this if I came back to it in a month. Whether it would still feel like me, or whether I leaned on a trend that will date quickly. If I am unsure, I sleep on it. Whatever survives the next morning usually deserves to ship.',
      'None of this is original. But running through it has saved me from pushing work I would have quietly regretted, and that is most of what taste is anyway. Small refusals, repeated until they become invisible.',
    ],
  },
]
