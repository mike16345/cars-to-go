import { LeadStatus } from "@prisma/client";

export interface LeadInput {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  carId?: string | null;
}

export interface LeadUpdateInput {
  status: LeadStatus;
}
