import { z } from "zod";
import { CarStatus } from "@prisma/client";

export const carBaseSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1980).max(new Date().getFullYear() + 1),
  mileage: z.number().int().positive().optional().nullable(),
  price: z.number().int().positive().optional().nullable(),
  status: z.nativeEnum(CarStatus).default(CarStatus.AVAILABLE),
  description: z.string().max(2000).optional().nullable(),
  images: z.array(z.string().url()).min(1).max(10).optional(),
  featured: z.boolean().optional(),
});

export const carCreateSchema = carBaseSchema;

export const carUpdateSchema = carBaseSchema.partial();

export const carFiltersSchema = z.object({
  q: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  maxYear: z.coerce.number().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  status: z.nativeEnum(CarStatus).optional(),
  sort: z
    .enum(["newest", "price-asc", "price-desc", "year-desc", "year-asc"])
    .optional(),
  featuredOnly: z.coerce.boolean().optional(),
});
