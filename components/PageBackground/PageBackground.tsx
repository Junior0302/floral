"use client";

import { memo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { pageBackgrounds } from "@/lib/data/products";

function PageBackground() {
  const pathname = usePathname();
  const src = pageBackgrounds[pathname];

  if (!src) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority={false}
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}

export default memo(PageBackground);
