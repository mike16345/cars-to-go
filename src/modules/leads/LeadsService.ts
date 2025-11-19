import { LeadsRepository } from "./LeadsRepository";
import { LeadInput, LeadUpdateInput } from "./leads.types";

export class LeadsService {
  constructor(private repository = new LeadsRepository()) {}

  async createLead(input: LeadInput) {
    return this.repository.create(input);
  }

  async listLeads() {
    return this.repository.list();
  }

  async updateLead(id: string, input: LeadUpdateInput) {
    return this.repository.update(id, input);
  }
}
