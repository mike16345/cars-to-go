import { Car } from "@prisma/client";
import { DealerService } from "@/modules/services/services.types";
import { ApiResponse } from "./common";

export type CarsResponse = ApiResponse<Car[]>;
export type CarResponse = ApiResponse<Car>;
export type ServicesResponse = ApiResponse<DealerService[]>;
