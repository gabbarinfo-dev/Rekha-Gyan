"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PixelTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Skip the initial hard page load because the base Meta Pixel script in layout.tsx already fires the initial PageView
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Fire PageView on client-side route transitions
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixelTracker() {
  return (
    <Suspense fallback={null}>
      <PixelTrackerInner />
    </Suspense>
  );
}
