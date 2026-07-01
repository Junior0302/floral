"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import PageLoader from "@/components/PageLoader";
import { LOADER_DURATION_MS } from "@/lib/constants/loader";
import { useUiStore } from "@/lib/store/ui";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef(children);
  const prevPath = useRef(pathname);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionIdRef = useRef(0);
  const setPageLoading = useUiStore((s) => s.setPageLoading);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [loading, setLoading] = useState(false);

  childrenRef.current = children;

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (pathname === prevPath.current && !loading) {
      setDisplayChildren(children);
    }
  }, [children, pathname, loading]);

  useEffect(() => {
    if (pathname === prevPath.current) return;

    const el = contentRef.current;
    const transitionId = ++transitionIdRef.current;

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (el) gsap.killTweensOf(el);

    setLoading(true);
    setPageLoading(true);
    if (el) gsap.set(el, { opacity: 0 });

    prevPath.current = pathname;
    setDisplayChildren(childrenRef.current);
    window.scrollTo(0, 0);

    hideTimerRef.current = setTimeout(() => {
      if (transitionIdRef.current !== transitionId) return;

      setLoading(false);
      setPageLoading(false);

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.55,
          ease: "power2.inOut",
        });
      }

      hideTimerRef.current = null;
    }, LOADER_DURATION_MS);
  }, [pathname, setPageLoading]);

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
