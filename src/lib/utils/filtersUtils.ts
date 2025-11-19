import { Car } from "@prisma/client";

export function extractUniqueMakes(cars: Car[]): string[] {
  const set = new Set(cars.map((car) => car.make));
  return Array.from(set).sort();
}

export function extractUniqueModels(cars: Car[], make?: string): string[] {
  const filtered = make ? cars.filter((car) => car.make === make) : cars;
  const set = new Set(filtered.map((car) => car.model));
  return Array.from(set).sort();
}
