import { Howl } from 'howler'
import { useCallback, useEffect, useState } from 'react'

// Import sound files
import handgunSound from '../sounds/handgun.mp3'
import switchSound from '../sounds/switch.wav'
import tapSound from '../sounds/tap.wav'

type SoundType = 'handgun' | 'switch' | 'tap'

const VOLUME_MAP: Record<SoundType, number> = {
  handgun: 0.12,
  switch: 0.15,
  tap: 0.18,
}

const STORAGE_KEY = 'portfolio-sound-enabled'

// Global state to share across all hook instances
let globalEnabled = true
let globalInitialized = false
const listeners = new Set<(enabled: boolean) => void>()

// Howl instances for each sound
const sounds: Record<SoundType, Howl> = {
  handgun: new Howl({
    src: [handgunSound],
    volume: VOLUME_MAP.handgun,
    preload: true,
  }),
  switch: new Howl({
    src: [switchSound],
    volume: VOLUME_MAP.switch,
    preload: true,
  }),
  tap: new Howl({
    src: [tapSound],
    volume: VOLUME_MAP.tap,
    preload: true,
  }),
}

function initializeFromStorage() {
  if (globalInitialized) return
  globalInitialized = true

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      globalEnabled = stored === 'true'
    }
  }
}

function setGlobalEnabled(enabled: boolean) {
  globalEnabled = enabled
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(enabled))
  }
  listeners.forEach((listener) => listener(enabled))
}

export function useSounds() {
  const [enabled, setEnabled] = useState(globalEnabled)

  // Initialize from storage on mount
  useEffect(() => {
    initializeFromStorage()
    setEnabled(globalEnabled)
  }, [])

  // Subscribe to global state changes
  useEffect(() => {
    const listener = (newEnabled: boolean) => {
      setEnabled(newEnabled)
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const playSound = useCallback((type: SoundType) => {
    // Don't play if disabled
    if (!globalEnabled) return

    try {
      const sound = sounds[type]
      // Stop any current playback to prevent overlap
      sound.stop()
      // Play the sound
      sound.play()
    } catch {
      // Silently fail - never block interaction
    }
  }, [])

  const toggleSound = useCallback(() => {
    setGlobalEnabled(!globalEnabled)
  }, [])

  return {
    enabled,
    playSound,
    toggleSound,
  }
}
