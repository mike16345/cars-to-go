import { Car, CarStatus } from "@prisma/client";
import { getDummyCarImages } from "@/lib/dummyCarImages";
import { CarsRepository } from "./CarsRepository";
import { CarFilters, CarInput, CarUpdateInput } from "./cars.types";

const DEFAULT_INVENTORY: CarInput[] = [
  {
    make: "Toyota",
    model: "Camry SE",
    year: 2022,
    mileage: 24000,
    price: 26500,
    status: CarStatus.AVAILABLE,
    description:
      "Clean title Camry with full service history, fresh from auction detail bay.",
    images: getDummyCarImages("Toyota", "Camry"),
    featured: true,
  },
  {
    make: "Tesla",
    model: "Model 3 Long Range",
    year: 2021,
    mileage: 31000,
    price: 34500,
    status: CarStatus.AVAILABLE,
    description: "Dual motor Model 3 with updated MCU and brand-new tires.",
    images: getDummyCarImages("Tesla", "Model-3"),
    featured: true,
  },
  {
    make: "Ford",
    model: "F-150 Lariat",
    year: 2019,
    mileage: 54000,
    price: 31500,
    status: CarStatus.AVAILABLE,
    description:
      "Lariat trim with 4x4, tow package, and the always-popular 3.5 EcoBoost.",
    images: getDummyCarImages("Ford", "F150"),
    featured: false,
  },
  {
    make: "BMW",
    model: "X5 xDrive40i",
    year: 2020,
    mileage: 42000,
    price: 38900,
    status: CarStatus.COMING_SOON,
    description: "Executive package with soft-close doors and panoramic roof.",
    images: getDummyCarImages("BMW", "X5"),
    featured: true,
  },
];

export class CarsService {
  constructor(private repository = new CarsRepository()) {}

  async listCars(filters: CarFilters): Promise<Car[]> {
    await this.ensureSeedData();
    return this.repository.list(filters);
  }

  async getFeaturedCars(): Promise<Car[]> {
    await this.ensureSeedData();
    const cars = await this.repository.getFeatured();

    if (cars.length > 0) {
      return cars;
    }

    const all = await this.repository.list({});
    return all.slice(0, 4);
  }

  async getCarById(id: string): Promise<Car> {
    await this.ensureSeedData();
    const car = await this.repository.findById(id);

    if (!car) {
      throw new Error("Car not found");
    }

    return car;
  }

  async createCar(input: CarInput): Promise<Car> {
    const payload = this.attachImages(input);
    return this.repository.create(payload);
  }

  async updateCar(id: string, input: CarUpdateInput): Promise<Car> {
    const payload = this.attachImages(input);
    return this.repository.update(id, payload);
  }

  async deleteCar(id: string): Promise<Car> {
    return this.repository.delete(id);
  }

  private attachImages<T extends CarInput | CarUpdateInput>(data: T): T {
    if (!("images" in data)) {
      return data;
    }

    if (!data.images || data.images.length === 0) {
      return {
        ...data,
        images: getDummyCarImages(data.make ?? "car", data.model ?? ""),
      } as T;
    }

    return data;
  }

  private async ensureSeedData(): Promise<void> {
    const existing = await this.repository.count();

    if (existing > 0) {
      return;
    }

    await Promise.all(DEFAULT_INVENTORY.map((car) => this.repository.create(car)));
  }
}
