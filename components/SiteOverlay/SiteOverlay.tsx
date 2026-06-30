"use client";

import { memo } from "react";

/** Overlay identique sur toutes les pages — assombrit la vidéo sans la masquer */
function SiteOverlay() {
  return <div className="site-overlay pointer-events-none fixed inset-0 z-[2]" aria-hidden />;
}

export default memo(SiteOverlay);
