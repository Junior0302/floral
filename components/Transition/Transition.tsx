"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef(children);
  const prevPath = useRef(pathname);
  const isFirstRender = useRef(true);
  const [displayChildren, setDisplayChildren] = useState(children);

  childrenRef.current = children;

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
    if (!el) {
      prevPath.current = pathname;
      setDisplayChildren(children);
      return;
    }

    window.scrollTo(0, 0);
    gsap.killTweensOf(el);

    gsap.to(el, {
      opacity: 0,
      scale: 0.97,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => {
        prevPath.current = pathname;
        setDisplayChildren(childrenRef.current);

        requestAnimationFrame(() => {
          if (!contentRef.current) return;
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.98 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.42,
              ease: "power2.out",
            }
          );
        });
      },
    });
  }, [pathname, children]);

  return (
    <div className="relative">
      <div ref={contentRef} style={{ transformOrigin: "center top" }}>
        {displayChildren}
      </div>
    </div>
  );
}
