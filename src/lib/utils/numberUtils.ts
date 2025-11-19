export function formatCurrency(value?: number | null, fallback = "Call for price"): string {
  if (value === undefined || value === null) {
    return fallback;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(value?: number | null): string {
  if (value === undefined || value === null) {
    return "-";
  }

  return `${value.toLocaleString()} mi`;
}
