"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/hooks/useLenis";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import SiteOverlay from "@/components/SiteOverlay";
import Welcome from "@/components/Welcome";
import BackgroundMusic from "@/components/BackgroundMusic";
import PageTransition from "@/components/Transition";
import ToastContainer from "@/components/Toast";
import CartDrawer from "@/components/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useLenis();

  const handleEnter = useCallback(() => setEntered(true), []);

  return (
    <>
      <BackgroundMusic />
      {!entered && (
        <>
          <Welcome onComplete={handleEnter} />
          <Cursor variant="welcome" />
        </>
      )}
      {entered && (
        <>
          <VideoBackground />
          <SiteOverlay />
          <Navbar />
          <Cursor />
          <ToastContainer />
          <CartDrawer />
          <main
            className="relative z-10"
            style={isHome ? { height: "100dvh", overflow: "hidden" } : undefined}
          >
            <PageTransition>{children}</PageTransition>
          </main>
        </>
      )}
    </>
  );
}
