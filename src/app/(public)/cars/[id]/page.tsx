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
    <div className="space-y-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{car.status.replace("_", " ")}</p>
        <h1 className="text-4xl font-semibold leading-tight">
          {car.year} {car.make} {car.model}
        </h1>
        <p className="text-muted-foreground">Auction sourced, fully reconditioned, and ready for the next owner.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_360px]">
        <div className="space-y-4">
          <div className="rounded-[2.5rem] border border-primary/15 bg-card/80 p-3 shadow-lg shadow-primary/10">
            <div className="relative aspect-video overflow-hidden rounded-[2rem]">
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
          </div>
          {images.length > 1 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.slice(1, 4).map((image) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10">
                  <Image src={image} alt={`${car.make} thumbnail`} fill sizes="(max-width: 1024px) 33vw, 20vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}
          <div className="rounded-3xl border border-primary/10 bg-card/90 p-6">
            <h2 className="text-xl font-semibold">Vehicle details</h2>
            <p className="mt-2 text-muted-foreground">{car.description}</p>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-primary/15 bg-card/95 p-6 shadow-xl shadow-primary/10">
          <CarPriceBadge price={car.price ?? undefined} status={car.status} />
          <dl className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
              <dt>Mileage</dt>
              <dd className="font-semibold text-foreground">{formatMileage(car.mileage)}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
              <dt>Listed</dt>
              <dd className="font-semibold text-foreground">{new Date(car.createdAt).toLocaleDateString()}</dd>
            </div>
          </dl>
          <p className="text-sm text-muted-foreground">
            Want to see service records or transport quotes? Send us a quick note and we will reply within one business day.
          </p>
          <Link
            href={`/contact?carId=${car.id}`}
            className={cn(buttonVariants(), "w-full justify-center rounded-full py-6 text-base font-semibold")}
          >
            Contact about this car
          </Link>
        </div>
      </div>
    </div>
  );
}
