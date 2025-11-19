import { ServicesRepository } from "./ServicesRepository";

export class ServicesService {
  constructor(private repository = new ServicesRepository()) {}

  async listServices() {
    return this.repository.list();
  }
}
