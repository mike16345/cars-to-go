"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Cars
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">To Go</p>
            <p className="text-lg font-semibold">Auction dealers</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative transition-colors hover:text-primary",
                pathname === link.href && "text-primary"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/inventory"
            className={cn(buttonVariants({ variant: "default" }), "hidden rounded-full px-6 text-sm font-semibold md:inline-flex")}
          >
            Browse inventory
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-primary/20 p-2 text-primary transition-colors hover:border-primary hover:bg-primary/5 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-b border-primary/10 bg-background shadow-lg md:hidden">
          <div className="container flex flex-col gap-3 py-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-full px-4 py-2 transition-colors hover:bg-primary/10",
                  pathname === link.href && "bg-primary/10 text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/inventory" className={cn(buttonVariants(), "w-full justify-center")} onClick={closeMenu}>
              Browse inventory
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
