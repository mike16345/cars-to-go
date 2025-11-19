import { prisma } from "@/lib/db";
import { Car, CarStatus, Prisma } from "@prisma/client";
import { CarFilters, CarInput, CarUpdateInput } from "./cars.types";

export class CarsRepository {
  async list(filters: CarFilters): Promise<Car[]> {
    const where: Prisma.CarWhereInput = {
      ...(filters.q && {
        OR: [
          { make: { contains: filters.q, mode: "insensitive" } },
          { model: { contains: filters.q, mode: "insensitive" } },
          { description: { contains: filters.q, mode: "insensitive" } },
        ],
      }),
      ...(filters.make && { make: { equals: filters.make } }),
      ...(filters.model && { model: { contains: filters.model, mode: "insensitive" } }),
      ...(filters.status && { status: filters.status }),
      ...(filters.minPrice || filters.maxPrice
        ? {
            price: {
              ...(filters.minPrice && { gte: filters.minPrice }),
              ...(filters.maxPrice && { lte: filters.maxPrice }),
            },
          }
        : {}),
      ...(filters.minYear || filters.maxYear
        ? {
            year: {
              ...(filters.minYear && { gte: filters.minYear }),
              ...(filters.maxYear && { lte: filters.maxYear }),
            },
          }
        : {}),
      ...(filters.featuredOnly ? { featured: true } : {}),
    };

    const orderBy = this.buildOrderBy(filters);

    return prisma.car.findMany({ where, orderBy });
  }

  async findById(id: string): Promise<Car | null> {
    return prisma.car.findUnique({ where: { id } });
  }

  async create(data: CarInput): Promise<Car> {
    return prisma.car.create({ data: this.mapInput(data) });
  }

  async update(id: string, data: CarUpdateInput): Promise<Car> {
    return prisma.car.update({ where: { id }, data: this.mapInput(data) });
  }

  async delete(id: string): Promise<Car> {
    return prisma.car.delete({ where: { id } });
  }

  async getFeatured(limit = 4): Promise<Car[]> {
    return prisma.car.findMany({
      where: { featured: true, status: { not: CarStatus.SOLD } },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  async count(): Promise<number> {
    return prisma.car.count();
  }

  private mapInput(data: CarInput | CarUpdateInput): Prisma.CarUpdateInput {
    return {
      ...data,
      images: data.images ? (data.images as Prisma.InputJsonValue) : undefined,
    };
  }

  private buildOrderBy(filters: CarFilters): Prisma.CarOrderByWithRelationInput[] {
    switch (filters.sort) {
      case "price-asc":
        return [{ price: "asc" }];
      case "price-desc":
        return [{ price: "desc" }];
      case "year-desc":
        return [{ year: "desc" }];
      case "year-asc":
        return [{ year: "asc" }];
      default:
        return [{ createdAt: "desc" }];
    }
  }
}
