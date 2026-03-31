import { createFileRoute } from '@tanstack/react-router'
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
          below.
        </p>
      </section>

      <section className="grid gap-10 border-t border-black/10 pt-10 dark:border-white/10 lg:grid-cols-[160px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <div className="space-y-2">
            {NOTES.map((note) => {
              const active = selectedNote.id === note.id
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setActiveNote(note.id)}
                  className="block text-left"
                >
                  <span
                    className={
                      active
                        ? 'text-[13px] text-black dark:text-white'
                        : 'text-[13px] text-black/45 transition-colors hover:text-black dark:text-white/45 dark:hover:text-white'
                    }
                  >
                    {note.shortTitle}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        <article className="space-y-8">
          <div className="space-y-2">
            <p className="font-geist-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
              {selectedNote.label}
            </p>
            <h3 className="max-w-2xl text-[28px] font-medium leading-[1.18] tracking-[-0.03em]">
              {selectedNote.title}
            </h3>
            <p className="max-w-2xl text-[13px] leading-7 text-black/62 dark:text-white/62">
              {selectedNote.subtitle}
            </p>
          </div>

          <div className="max-w-2xl space-y-5 text-[14px] leading-7 text-black/78 dark:text-white/78">
            {selectedNote.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {selectedNote.id === 'sound' ? <SoundTester /> : null}
        </article>
      </section>
    </CleanLayout>
  )
}

const NOTES = [
  {
    id: 'sound',
    label: 'Note 001',
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
]
