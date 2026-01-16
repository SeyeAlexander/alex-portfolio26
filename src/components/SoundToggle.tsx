import { Volume2, VolumeX } from 'lucide-react'
import { useSounds } from '../hooks/useSounds'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function SoundToggle() {
  const { enabled, toggleSound, playSound } = useSounds()

  const handleClick = () => {
    playSound('tap')
    toggleSound()
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className="flex items-center justify-center size-7 rounded-full bg-black/10 text-black transition-transform duration-200 ease-out hover:scale-95"
          aria-label={enabled ? 'Mute sounds' : 'Unmute sounds'}
        >
          {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        {enabled ? 'Hear taps' : 'No taps'}
      </TooltipContent>
    </Tooltip>
  )
}
