"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import PageLoader from "@/components/PageLoader";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    gsap.to(el, {
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        prevPath.current = pathname;
        setDisplayChildren(childrenRef.current);

        requestAnimationFrame(() => {
          if (!contentRef.current) {
            setLoading(false);
            return;
          }
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.97, filter: "blur(8px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(contentRef.current, { clearProps: "filter" });
                setLoading(false);
              },
            }
          );
        });
      },
    });
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
