"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import PageLoader from "@/components/PageLoader";
import { LOADER_DURATION_MS } from "@/lib/constants/loader";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef(children);
  const prevPath = useRef(pathname);
  const isFirstRender = useRef(true);
  const loaderStartedAt = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionIdRef = useRef(0);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [loading, setLoading] = useState(false);

  childrenRef.current = children;

  const scheduleHideLoader = (transitionId: number, onDone: () => void) => {
    const elapsed = Date.now() - loaderStartedAt.current;
    const remaining = Math.max(0, LOADER_DURATION_MS - elapsed);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (transitionIdRef.current !== transitionId) return;
      setLoading(false);
      hideTimerRef.current = null;
      onDone();
    }, remaining);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (pathname === prevPath.current) {
      setDisplayChildren(children);
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPath.current = pathname;
      setDisplayChildren(children);
      return;
    }

    const el = contentRef.current;
    const transitionId = ++transitionIdRef.current;

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    gsap.killTweensOf(el);

    loaderStartedAt.current = Date.now();
    setLoading(true);

    if (el) gsap.set(el, { opacity: 0, scale: 0.98 });

    prevPath.current = pathname;
    setDisplayChildren(childrenRef.current);

    const revealContent = () => {
      if (transitionIdRef.current !== transitionId || !contentRef.current) return;
      gsap.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.42,
        ease: "power3.out",
      });
    };

    scheduleHideLoader(transitionId, revealContent);
    window.scrollTo(0, 0);
  }, [pathname, children]);

  return (
    <>
      <PageLoader active={loading} />
      <div className="relative">
        <div ref={contentRef} className="origin-top">
          {displayChildren}
        </div>
      </div>
    </>
  );
}
