"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useNavigation } from "./NavigationProvider";

export type InteractiveNavLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> &
  LinkProps & {
    pendingClassName?: string;
  };

/**
 * Link wrapper that coordinates with navigation progress state to prevent spam-clicks.
 * - App Router: manually pushes navigation to ensure the global bar starts.
 * - Pages Router: lets <Link> handle navigation while still marking the pending href.
 */
export function InteractiveNavLink({
  href,
  onClick,
  className,
  pendingClassName,
  children,
  ...rest
}: InteractiveNavLinkProps) {
  const { pendingHref, startNavigation, isNavigating } = useNavigation();
  const router = useSafeAppRouter();

  const hrefString = useMemo(() => normalizeHref(href), [href]);
  const isPending = isNavigating && pendingHref === hrefString;

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (isPending) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
      if (event.defaultPrevented) return;
    }

    if (hrefString) {
      startNavigation(hrefString);
    }

    if (router) {
      event.preventDefault();
      router.push(href);
    }
  };

  return (
    <Link
      {...rest}
      href={href}
      onClick={handleClick}
      aria-busy={isPending}
      aria-disabled={isPending}
      className={cn(className, isPending && ["cursor-progress opacity-70", pendingClassName])}
      tabIndex={isPending ? -1 : rest.tabIndex}
    >
      {children}
    </Link>
  );
}

function normalizeHref(href: LinkProps["href"]): string | null {
  if (typeof href === "string") return href;
  if (!href) return null;
  const pathname = "pathname" in href ? href.pathname ?? "" : "";
  const query = "query" in href && href.query ? `?${new URLSearchParams(href.query as Record<string, string>).toString()}` : "";
  const hash = "hash" in href && href.hash ? `#${href.hash.replace(/^#/, "")}` : "";
  return `${pathname}${query}${hash}` || null;
}

function useSafeAppRouter() {
  try {
    return useRouter();
  } catch {
    return null;
  }
}
