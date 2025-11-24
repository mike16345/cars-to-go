import type { Car } from "@prisma/client";
import { CarCard } from "./CarCard";

interface CarGridProps {
  cars: Car[];
  emptyLabel?: string;
}

export function CarGrid({ cars, emptyLabel = "No cars found" }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-primary/20 bg-card/70 p-10 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
