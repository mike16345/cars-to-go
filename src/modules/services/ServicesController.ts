import { ServicesService } from "./ServicesService";

export class ServicesController {
  constructor(private service = new ServicesService()) {}

  async list() {
    const services = await this.service.listServices();
    return { data: services };
  }
}
