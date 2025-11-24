import { leadCreateSchema, leadUpdateSchema } from "./leads.schema";
import { LeadsService } from "./LeadsService";
import { LeadInput, LeadUpdateInput } from "./leads.types";

export class LeadsController {
  constructor(private service = new LeadsService()) {}

  async create(payload: unknown) {
    const input = this.parseCreate(payload);
    const lead = await this.service.createLead(input);

    return { data: lead };
  }

  async list() {
    const leads = await this.service.listLeads();

    return { data: leads };
  }

  async update(id: string, payload: unknown) {
    const input = this.parseUpdate(payload);
    const lead = await this.service.updateLead(id, input);
    return { data: lead };
  }

  private parseCreate(payload: unknown): LeadInput {
    const parsed = leadCreateSchema.safeParse(payload);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  }

  private parseUpdate(payload: unknown): LeadUpdateInput {
    const parsed = leadUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  }
}
