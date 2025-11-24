"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type NavigationState = {
  isNavigating: boolean;
  pendingHref: string | null;
};

export type NavigationControls = {
  startNavigation: (href: string) => void;
  completeNavigation: () => void;
};

/**
 * Framework-agnostic navigation progress hook that works in both Next.js App Router and Pages Router.
 * - App Router: start navigation via InteractiveNavLink, then automatically completes when pathname changes.
 * - Pages Router: subscribes to `next/router` events to start/stop navigation.
 */
export function useNavigationProgress(): NavigationState & NavigationControls {
  const pathname = useSafePathname();
  const [state, setState] = useState<NavigationState>({
    isNavigating: false,
    pendingHref: null,
  });
  const lastPathnameRef = useRef<string | null>(pathname ?? null);

  const startNavigation = useCallback((href: string) => {
    setState({ isNavigating: true, pendingHref: href });
  }, []);

  const completeNavigation = useCallback(() => {
    setState({ isNavigating: false, pendingHref: null });
  }, []);

  // App Router: if the pathname changes, mark navigation as complete.
  useEffect(() => {
    if (!pathname || lastPathnameRef.current === pathname) return;
    lastPathnameRef.current = pathname;
    completeNavigation();
  }, [pathname, completeNavigation]);

  // Pages Router: subscribe to router events when they are available.
  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const setupPagesRouter = async () => {
      try {
        const mod = await import("next/router");
        if (!mounted) return;
        const router = mod.default;
        if (!router?.events) return;

        const handleStart = (url: string) => startNavigation(url);
        const handleDone = () => completeNavigation();

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleDone);
        router.events.on("routeChangeError", handleDone);

        cleanup = () => {
          router.events.off("routeChangeStart", handleStart);
          router.events.off("routeChangeComplete", handleDone);
          router.events.off("routeChangeError", handleDone);
        };
      } catch {
        // Swallow import errors so App Router builds do not break.
      }
    };

    setupPagesRouter();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, [startNavigation, completeNavigation]);

  return { ...state, startNavigation, completeNavigation };
}

function useSafePathname() {
  try {
    return usePathname();
  } catch {
    return null;
  }
}
