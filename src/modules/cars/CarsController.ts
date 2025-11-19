import { carCreateSchema, carFiltersSchema, carUpdateSchema } from "./cars.schema";
import { CarsService } from "./CarsService";
import { CarFilters, CarInput, CarUpdateInput } from "./cars.types";

export class CarsController {
  constructor(private service = new CarsService()) {}

  async list(query: Record<string, unknown>) {
    const filters = this.parseFilters(query);
    const cars = await this.service.listCars(filters);
    return { data: cars };
  }

  async featured() {
    const cars = await this.service.getFeaturedCars();
    return { data: cars };
  }

  async getById(id: string) {
    const car = await this.service.getCarById(id);
    return { data: car };
  }

  async create(payload: unknown) {
    const input = this.parseCreate(payload);
    const car = await this.service.createCar(input);
    return { data: car };
  }

  async update(id: string, payload: unknown) {
    const input = this.parseUpdate(payload);
    const car = await this.service.updateCar(id, input);
    return { data: car };
  }

  async remove(id: string) {
    const car = await this.service.deleteCar(id);
    return { data: car };
  }

  private parseFilters(query: Record<string, unknown>): CarFilters {
    const parsed = carFiltersSchema.safeParse(query);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  }

  private parseCreate(payload: unknown): CarInput {
    const parsed = carCreateSchema.safeParse(payload);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  }

  private parseUpdate(payload: unknown): CarUpdateInput {
    const parsed = carUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  }
}
