"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { CarStatus } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { objectToSearchParams } from "@/lib/utils/queryUtils";

interface CarFiltersProps {
  initialFilters: Record<string, string>;
  makes: string[];
  models: string[];
}

export function CarFilters({ initialFilters, makes, models }: CarFiltersProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  const handleInput = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const query = objectToSearchParams({ ...filters });
    router.push(query ? `/inventory?${query}` : "/inventory");
  };

  const handleReset = () => {
    setFilters({} as Record<string, string>);
    router.push("/inventory");
  };

  const statusOptions = useMemo<CarStatus[]>(() => ["AVAILABLE", "SOLD", "COMING_SOON"], []);

  return (
    <div className="space-y-6 rounded-3xl border border-primary/15 bg-card/95 p-5 shadow-lg shadow-primary/5 lg:sticky lg:top-28">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Filters</p>
        <p className="text-sm text-muted-foreground">Dial in the right budget, year, and status.</p>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Price range</Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(event) => handleInput("minPrice", event.target.value)}
            type="number"
          />
          <Input
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(event) => handleInput("maxPrice", event.target.value)}
            type="number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Year range</Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Min"
            value={filters.minYear ?? ""}
            onChange={(event) => handleInput("minYear", event.target.value)}
            type="number"
          />
          <Input
            placeholder="Max"
            value={filters.maxYear ?? ""}
            onChange={(event) => handleInput("maxYear", event.target.value)}
            type="number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Make</Label>
        <Select value={filters.make ?? ""} onValueChange={(value) => handleInput("make", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any">Any</SelectItem>
            {makes.map((make) => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Model</Label>
        <Select value={filters.model ?? ""} onValueChange={(value) => handleInput("model", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any">Any</SelectItem>
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Status</Label>
        <Select value={filters.status ?? ""} onValueChange={(value) => handleInput("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any">Any</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Sort</Label>
        <Select value={(filters.sort as string) ?? "newest"} onValueChange={(value) => handleInput("sort", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="year-desc">Year: Newest</SelectItem>
            <SelectItem value="year-asc">Year: Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1 rounded-full" onClick={handleSubmit} type="button">
          Apply filters
        </Button>
        <Button variant="outline" onClick={handleReset} type="button" className="rounded-full border-primary/30">
          Reset
        </Button>
      </div>
    </div>
  );
}
