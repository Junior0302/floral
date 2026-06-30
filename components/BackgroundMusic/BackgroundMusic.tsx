"use client";

import { memo, useEffect, useRef } from "react";
import { BACKGROUND_MUSIC_SRC, useAudioStore } from "@/lib/store/audio";

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicMuted = useAudioStore((s) => s.musicMuted);
  const registerPlay = useAudioStore((s) => s.registerPlay);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.28;
    audio.loop = true;

    registerPlay(() => {
      if (!useAudioStore.getState().musicMuted) {
        audio.play().catch(() => {});
      }
    });

    return () => registerPlay(() => {});
  }, [registerPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicMuted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [musicMuted]);

  return (
    <audio ref={audioRef} src={BACKGROUND_MUSIC_SRC} preload="auto" aria-hidden />
  );
}

export default memo(BackgroundMusic);
