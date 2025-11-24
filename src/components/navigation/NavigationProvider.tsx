"use client";

import { createContext, useContext } from "react";
import { useNavigationProgress, type NavigationControls, type NavigationState } from "@/hooks/useNavigationProgress";

export type NavigationContextValue = NavigationState & NavigationControls;

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

/**
 * Wrap your application with this provider to enable navigation progress tracking.
 *
 * Usage:
 * - App Router: place <NavigationProvider> and <TopNavLoadingBar /> inside app/layout.tsx.
 * - Pages Router: wrap the tree in pages/_app.tsx so navigation state is shared across pages.
 */
export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const value = useNavigationProgress();

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

/**
 * Access the global navigation state and controls.
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
