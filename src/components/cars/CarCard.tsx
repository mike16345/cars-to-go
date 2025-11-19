import Link from "next/link";
import Image from "next/image";
import type { Car } from "@prisma/client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CarPriceBadge } from "./CarPriceBadge";
import { formatMileage } from "@/lib/utils/numberUtils";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const firstImage = Array.isArray(car.images) ? (car.images as string[])[0] : undefined;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/cars/${car.id}`} className="relative block h-56 w-full">
          {firstImage ? (
            <Image src={firstImage} alt={`${car.make} ${car.model}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">No image</div>
          )}
        </Link>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div>
          <p className="text-sm text-muted-foreground">{car.year}</p>
          <h3 className="text-lg font-semibold">
            {car.make} {car.model}
          </h3>
        </div>
        <CarPriceBadge price={car.price ?? undefined} status={car.status} />
        <p className="text-sm text-muted-foreground">Mileage: {formatMileage(car.mileage)}</p>
      </CardContent>
    </Card>
  );
}
