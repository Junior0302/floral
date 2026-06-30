"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/hooks/useLenis";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import PageBackground from "@/components/PageBackground";
import Loader from "@/components/Loader";
import PageTransition from "@/components/Transition";
import ToastContainer from "@/components/Toast";
import CartDrawer from "@/components/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useLenis();

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      <VideoBackground />
      <PageBackground />
      <Navbar />
      <Cursor />
      <ToastContainer />
      <CartDrawer />
      <main
        className="relative z-10"
        style={isHome ? { height: "100vh", overflow: "hidden" } : undefined}
      >
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
