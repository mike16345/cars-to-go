import { CarsService } from "@/modules/cars/CarsService";
import type { CarStatus } from "@prisma/client";
import { CarFilters } from "@/components/cars/CarFilters";
import { CarGrid } from "@/components/cars/CarGrid";
import { CarSearchBar } from "@/components/cars/CarSearchBar";
import { extractUniqueMakes, extractUniqueModels } from "@/lib/utils/filtersUtils";
import { CarSortOption } from "@/modules/cars/cars.types";

interface InventoryPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const params = await searchParams;
  const filters = normalizeFilters(params);
  const service = new CarsService();
  const cars = await service.listCars(filters);
  const makes = extractUniqueMakes(cars);
  const models = extractUniqueModels(cars, filters.make);

  return (
    <div className="space-y-12">
      <div className="rounded-[2rem] border border-primary/10 bg-card/90 p-6 shadow-lg shadow-primary/10 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Search inventory</p>
            <h1 className="text-3xl font-semibold leading-tight">Every lane win, ready to shop.</h1>
            <p className="text-muted-foreground">
              Filter by price, mileage, or status to find the perfect wholesale-ready vehicle.
            </p>
          </div>
          <div className="w-full md:max-w-md">
            <CarSearchBar />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <CarFilters initialFilters={mapFiltersToStrings(filters)} makes={makes} models={models} />
        <CarGrid cars={cars} emptyLabel="No cars match these filters" />
      </div>
    </div>
  );
}

function normalizeFilters(query: Record<string, string | string[] | undefined>) {
  console.log("Raw query params:", query);
  const rawSort = getValue(query.sort);

  const validSorts: CarSortOption[] = [
    "newest",
    "price-asc",
    "price-desc",
    "year-desc",
    "year-asc",
  ];
  const sort: CarSortOption =
    rawSort && validSorts.includes(rawSort as CarSortOption)
      ? (rawSort as CarSortOption)
      : "newest";

  return {
    q: getValue(query.q),
    minPrice: toNumber(query.minPrice),
    maxPrice: toNumber(query.maxPrice),
    minYear: toNumber(query.minYear),
    maxYear: toNumber(query.maxYear),
    make: getValue(query.make),
    model: getValue(query.model),
    status: getValue(query.status) as CarStatus | undefined,
    sort,
  };
}

function mapFiltersToStrings(filters: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [key, value ? String(value) : ""])
  );
}

function getValue(input?: string | string[]) {
  if (Array.isArray(input)) {
    return input[0];
  }

  return input;
}

function toNumber(input?: string | string[]) {
  const value = getValue(input);
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}
