import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CarsService } from "@/modules/cars/CarsService";
import { CarGrid } from "@/components/cars/CarGrid";
import { ServicesController } from "@/modules/services/ServicesController";

const WHY_CARDS = [
  {
    title: "Auction expertise",
    description: "We attend the major lanes weekly so we know what is worth buying and what to walk away from.",
  },
  {
    title: "In-house reconditioning",
    description: "Mechanical repairs, detailing, and title work happen under one roof for faster turnarounds.",
  },
  {
    title: "Transparent pricing",
    description: "Every car is listed with full recon notes, auction fees, and our margin. No surprises.",
  },
];

export default async function HomePage() {
  const carsService = new CarsService();
  const servicesController = new ServicesController();
  const featured = await carsService.getFeaturedCars();
  const services = await servicesController.list();

  return (
    <div className="space-y-20">
      <section className="grid gap-10 rounded-[2.75rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-10 shadow-xl shadow-primary/10 md:grid-cols-2 md:p-14">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Cars to go
            <span className="h-1 w-1 rounded-full bg-primary" />
            Midwest dealers
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Auction-built cars, reconditioned for the next owner.
          </h1>
          <p className="text-lg text-muted-foreground">
            We buy from trusted auction lanes every week, handle the recon in-house, and list every detail so you can shop with total confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/inventory"
              className={cn(
                buttonVariants(),
                "rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40"
              )}
            >
              Browse inventory
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full border-primary/30 px-8 py-6 text-base font-semibold hover:border-primary hover:text-primary"
              )}
            >
              Talk with us
            </Link>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold text-foreground">300+</p>
              <p>Cars sourced each season</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24 hr</p>
              <p>Average recon kickoff</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">100%</p>
              <p>Transparent cost breakdowns</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-primary/15 bg-card/80 p-6 shadow-lg shadow-primary/5">
          <h2 className="text-2xl font-semibold">Why partner with a lane expert?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every vehicle is curated, inspected, and documented before it hits our site.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            {WHY_CARDS.map((item) => (
              <li key={item.title} className="rounded-2xl border border-primary/10 bg-background/70 p-4">
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Inventory</p>
            <h2 className="text-3xl font-semibold">Featured vehicles</h2>
            <p className="text-muted-foreground">Fresh arrivals straight from the auction lanes, fully detailed and ready for a test drive.</p>
          </div>
          <Link href="/inventory" className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6")}>
            View all inventory
          </Link>
        </div>
        <CarGrid cars={featured} emptyLabel="No featured vehicles yet" />
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Shop services</p>
          <h2 className="text-3xl font-semibold">Packages built for speed</h2>
          <p className="text-muted-foreground">Detailing, mechanical, and paperwork handled by the same crew that sources every vehicle.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.data.map((service) => (
            <div key={service.id} className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-card/90 p-6 shadow-md shadow-primary/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">{service.turnaround}</p>
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                </div>
                <span className="rounded-full bg-accent/20 px-4 py-1 text-sm font-semibold text-accent-foreground">
                  {service.priceHint}
                </span>
              </div>
              <p className="text-base text-muted-foreground">{service.description}</p>
              <div className="text-sm font-medium text-primary">Turnaround: {service.turnaround}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
