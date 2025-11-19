import { CarStatus } from "@prisma/client";

export interface CarFilters {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  make?: string;
  model?: string;
  status?: CarStatus;
  sort?: CarSortOption;
  featuredOnly?: boolean;
}

export type CarSortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc";

export interface CarInput {
  make: string;
  model: string;
  year: number;
  mileage?: number | null;
  price?: number | null;
  status?: CarStatus;
  description?: string | null;
  images?: string[];
  featured?: boolean;
}

export type CarUpdateInput = Partial<CarInput>;
