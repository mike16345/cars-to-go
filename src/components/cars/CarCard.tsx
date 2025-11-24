import Image from "next/image";
import type { Car } from "@prisma/client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CarPriceBadge } from "./CarPriceBadge";
import { formatMileage } from "@/lib/utils/numberUtils";
import { InteractiveNavLink } from "../navigation/InteractiveNavLink";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const firstImage = Array.isArray(car.images) ? (car.images as string[])[0] : undefined;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      <CardHeader className="p-0">
        <InteractiveNavLink href={`/cars/${car.id}`} className="relative block aspect-[4/3] w-full overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">No image</div>
          )}
        </InteractiveNavLink>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">{car.year}</p>
          <h3 className="text-xl font-semibold">
            {car.make} {car.model}
          </h3>
        </div>
        <CarPriceBadge price={car.price ?? undefined} status={car.status} />
        <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>Mileage</span>
          <span className="font-medium text-foreground">{formatMileage(car.mileage)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
