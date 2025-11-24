import { prisma } from "@/lib/db";
import { Lead } from "@prisma/client";
import { LeadInput, LeadUpdateInput } from "./leads.types";

export class LeadsRepository {
  async create(data: LeadInput): Promise<Lead> {
    return prisma.lead.create({ data });
  }

  async list(): Promise<Lead[]> {
    return prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: LeadUpdateInput): Promise<Lead> {
    return prisma.lead.update({ where: { id }, data });
  }
}
