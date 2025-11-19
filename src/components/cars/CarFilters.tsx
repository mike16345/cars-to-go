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
    <div className="space-y-4 rounded-md border bg-card p-4">
      <div className="space-y-2">
        <Label>Price range</Label>
        <div className="grid grid-cols-2 gap-2">
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
        <Label>Year range</Label>
        <div className="grid grid-cols-2 gap-2">
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
        <Label>Make</Label>
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
        <Label>Model</Label>
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
        <Label>Status</Label>
        <Select
          value={filters.status ?? ""}
          onValueChange={(value) => handleInput("status", value)}
        >
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
        <Label>Sort</Label>
        <Select
          value={(filters.sort as string) ?? "newest"}
          onValueChange={(value) => handleInput("sort", value)}
        >
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

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleSubmit} type="button">
          Apply filters
        </Button>
        <Button variant="outline" onClick={handleReset} type="button">
          Reset
        </Button>
      </div>
    </div>
  );
}
