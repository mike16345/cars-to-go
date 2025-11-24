import { InteractiveNavLink } from "../navigation/InteractiveNavLink";

export function Footer() {
  return (
    <footer className="p-4 border-t border-primary/10 bg-primary/5">
      <div className="container py-10">
        <div className="grid gap-6 text-sm text-muted-foreground md:grid-cols-[2fr_1fr] md:items-center">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Cars to go</p>
            <p>
              Auction-sourced vehicles, transparent pricing, and a service team focused on getting
              you on the road fast.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <InteractiveNavLink href="/privacy" className="transition hover:text-primary">
              Privacy
            </InteractiveNavLink>
            <InteractiveNavLink href="/contact" className="transition hover:text-primary">
              Contact
            </InteractiveNavLink>
            <InteractiveNavLink href="/admin" className="transition hover:text-primary">
              Admin
            </InteractiveNavLink>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Cars to go. All rights reserved.</p>
          <p>Made with care in the Midwest auction lanes.</p>
        </div>
      </div>
    </footer>
  );
}
