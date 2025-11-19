"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/cars", label: "Cars" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/services", label: "Services" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 border-r bg-muted/40 p-6 md:block">
      <div className="text-lg font-semibold">Cars to go Admin</div>
      <nav className="mt-6 flex flex-col gap-2 text-sm">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded px-3 py-2 transition",
              pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
