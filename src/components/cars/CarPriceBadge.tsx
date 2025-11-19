import type { CarStatus } from "@prisma/client";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/lib/utils/numberUtils";

interface CarPriceBadgeProps {
  price?: number | null;
  status: CarStatus;
}

export function CarPriceBadge({ price, status }: CarPriceBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold">{formatCurrency(price)}</span>
      <Badge variant={status === "AVAILABLE" ? "default" : "secondary"}>{status.replace("_", " ")}</Badge>
    </div>
  );
}
