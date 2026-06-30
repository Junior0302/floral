"use client";

import { memo, useEffect, useRef } from "react";

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1;
    const play = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }

    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/floral.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay absolute inset-0" />
    </div>
  );
}

export default memo(VideoBackground);
