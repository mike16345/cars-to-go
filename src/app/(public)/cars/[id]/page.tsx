import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarsService } from "@/modules/cars/CarsService";
import { CarPriceBadge } from "@/components/cars/CarPriceBadge";
import { formatMileage } from "@/lib/utils/numberUtils";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarDetailPageProps {
  params: { id: string };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const service = new CarsService();

  const car = await service.getCarById(params.id).catch(() => null);

  if (!car) {
    notFound();
  }

  const images = Array.isArray(car.images) ? (car.images as string[]) : [];

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase text-muted-foreground">{car.make}</p>
        <h1 className="text-4xl font-bold">
          {car.year} {car.make} {car.model}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={`${car.make} ${car.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">No image</div>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {images.slice(1, 4).map((image) => (
              <div key={image} className="relative h-28 overflow-hidden rounded-lg border">
                <Image
                  src={image}
                  alt={`${car.make} thumbnail`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border bg-background p-6">
          <CarPriceBadge price={car.price ?? undefined} status={car.status} />
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Mileage: {formatMileage(car.mileage)}</p>
            <p>Created: {new Date(car.createdAt).toLocaleDateString()}</p>
          </div>
          <p className="text-muted-foreground">{car.description}</p>
          <Link
            href={`/contact?carId=${car.id}`}
            className={cn(buttonVariants(), "w-full justify-center")}
          >
            Contact about this car
          </Link>
        </div>
      </div>
    </div>
  );
}
