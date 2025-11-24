import { LeadStatus, type Lead } from "@prisma/client";

export interface LeadInput extends Lead {
  carId?: string | null;
}

export interface LeadUpdateInput {
  status: LeadStatus;
}
