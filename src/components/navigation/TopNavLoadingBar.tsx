"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "./NavigationProvider";

/**
 * Thin indeterminate loading bar that animates across the top of the viewport while navigation is in flight.
 * Wire it up at the root layout (App Router) or custom _app (Pages Router) so it is always present.
 */
export function TopNavLoadingBar() {
  const { isNavigating } = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isNavigating) {
      timeout = setTimeout(() => setIsVisible(true), 120); // avoid flashing on very fast navigations
    } else {
      timeout = setTimeout(() => setIsVisible(false), 180);
    }
    return () => clearTimeout(timeout);
  }, [isNavigating]);

  const barClassName = useMemo(() => {
    return [
      "pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden",
      "transition-opacity duration-200",
      isVisible ? "opacity-100" : "opacity-0",
    ].join(" ");
  }, [isVisible]);

  return (
    <div className={barClassName} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/70 to-primary/40" />
      <div className="loading-blip absolute inset-y-0 w-1/3 min-w-[120px] rounded-full bg-primary" />
      <style jsx>{`
        @keyframes nav-blip {
          0% { transform: translateX(-50%); }
          50% { transform: translateX(160%); }
          100% { transform: translateX(-50%); }
        }
        .loading-blip {
          animation: nav-blip 1.1s ease-in-out infinite;
          opacity: 0.95;
        }
      `}</style>
    </div>
  );
}
