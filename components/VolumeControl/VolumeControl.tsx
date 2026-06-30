"use client";

import { memo } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAudioStore } from "@/lib/store/audio";

interface VolumeControlProps {
  className?: string;
  size?: number;
}

function VolumeControl({ className, size = 17 }: VolumeControlProps) {
  const musicMuted = useAudioStore((s) => s.musicMuted);
  const toggleMusic = useAudioStore((s) => s.toggleMusic);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={musicMuted ? "Activer la musique" : "Couper la musique"}
      data-cursor="hover"
      className={cn("flora-icon-btn", className)}
    >
      {musicMuted ? <VolumeX size={size} strokeWidth={1.75} /> : <Volume2 size={size} strokeWidth={1.75} />}
    </button>
  );
}

export default memo(VolumeControl);
