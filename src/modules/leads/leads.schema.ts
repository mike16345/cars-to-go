import { z } from "zod";
import { LeadStatus } from "@prisma/client";

export const leadCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z
    .string()
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  message: z.string().max(2000).optional(),
  carId: z.string().cuid().optional(),
});

export const leadUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});
