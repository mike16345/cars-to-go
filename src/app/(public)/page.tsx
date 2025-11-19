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
    <div className="space-y-16">
      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-10 shadow-sm md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-wide text-primary">Cars to go</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Auction-built cars, ready for the next owner.</h1>
          <p className="text-lg text-muted-foreground">
            We hand-pick the best lanes, win the right cars, and complete every inspection and repair before you ever step on the lot.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/inventory" className={cn(buttonVariants(), "px-8 text-base")}>Browse inventory</Link>
            <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }), "px-8 text-base")}>Talk with us</Link>
          </div>
        </div>
        <div className="rounded-2xl border bg-background/60 p-6">
          <h2 className="text-xl font-semibold">Why choose auction cars?</h2>
          <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
            {WHY_CARDS.map((item) => (
              <li key={item.title} className="rounded-lg border bg-card/80 p-4">
                <p className="font-medium text-foreground">{item.title}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase text-muted-foreground">Inventory</p>
            <h2 className="text-3xl font-semibold">Featured cars</h2>
          </div>
          <Link href="/inventory" className={buttonVariants({ variant: "outline" })}>
            View all
          </Link>
        </div>
        <CarGrid cars={featured} emptyLabel="No featured vehicles yet" />
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase text-muted-foreground">Shop</p>
          <h2 className="text-3xl font-semibold">Services we offer</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.data.map((service) => (
            <div key={service.id} className="rounded-2xl border bg-background p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <span className="text-sm text-muted-foreground">{service.priceHint}</span>
              </div>
              <p className="mt-3 text-muted-foreground">{service.description}</p>
              <p className="mt-3 text-sm font-medium">Turnaround: {service.turnaround}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
