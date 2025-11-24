import { z } from "zod";
import { LeadStatus, type Lead } from "@prisma/client";
import { transformOptionalFieldValue } from "@/lib/utils";

export const leadCreateSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  phone: z.string().optional().transform(transformOptionalFieldValue),
  message: z.string().max(2000).optional(),
  // carId: z.cuid().optional().transform(transformOptionalFieldValue),
});

export const leadUpdateSchema = z.object({
  status: z.enum(LeadStatus),
});
