import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioState {
  musicMuted: boolean;
  toggleMusic: () => void;
  setMusicMuted: (muted: boolean) => void;
  playMusic: () => void;
  registerPlay: (fn: () => void) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      musicMuted: false,
      toggleMusic: () => set((s) => ({ musicMuted: !s.musicMuted })),
      setMusicMuted: (muted) => set({ musicMuted: muted }),
      playMusic: () => {
        /* enregistré par BackgroundMusic */
      },
      registerPlay: (fn) => set({ playMusic: fn }),
    }),
    {
      name: "flora-audio",
      partialize: (state) => ({ musicMuted: state.musicMuted }),
    }
  )
);

export const BACKGROUND_MUSIC_SRC = "/music/song1.mp3";
