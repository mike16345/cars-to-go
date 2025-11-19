"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Car } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";

const CAR_STATUS_OPTIONS = ["AVAILABLE", "SOLD", "COMING_SOON"] as const;
type CarStatusOption = (typeof CAR_STATUS_OPTIONS)[number];

const carFormSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().min(1980),
  mileage: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  status: z.enum(CAR_STATUS_OPTIONS),
  description: z.string().optional(),
  images: z.string().optional(),
  featured: z.boolean().optional(),
});

type CarFormValues = z.infer<typeof carFormSchema>;

interface CarFormProps {
  car?: Car;
  onSuccess?: () => void;
}

export function CarForm({ car, onSuccess }: CarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: car?.make ?? "",
      model: car?.model ?? "",
      year: car?.year ?? new Date().getFullYear(),
      mileage: car?.mileage ?? undefined,
      price: car?.price ?? undefined,
      status: (car?.status as CarStatusOption) ?? "AVAILABLE",
      description: car?.description ?? "",
      images: Array.isArray(car?.images) ? (car?.images as string[]).join(", ") : "",
      featured: car?.featured ?? false,
    },
  });

  const handleSubmit = async (values: CarFormValues) => {
    setIsSubmitting(true);

    try {
      const payload = {
        ...values,
        mileage: normalizeNumber(values.mileage),
        price: normalizeNumber(values.price),
        images: values.images
          ? values.images
              .split(",")
              .map((url) => url.trim())
              .filter(Boolean)
          : undefined,
      };

      const response = await fetch(`/api/cars${car ? `?id=${car.id}` : ""}`, {
        method: car ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to save car");
      }

      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Make</Label>
          <Input {...form.register("make")} />
        </div>
        <div className="space-y-2">
          <Label>Model</Label>
          <Input {...form.register("model")} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Year</Label>
          <Input type="number" {...form.register("year", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label>Mileage</Label>
          <Input type="number" {...form.register("mileage", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label>Price</Label>
          <Input type="number" {...form.register("price", { valueAsNumber: true })} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={form.watch("status")} onValueChange={(value) => form.setValue("status", value as CarStatusOption)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CAR_STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea rows={4} {...form.register("description")} />
      </div>
      <div className="space-y-2">
        <Label>Image URLs (comma separated)</Label>
        <Textarea rows={2} {...form.register("images")} />
      </div>
      <div className="flex items-center justify-between rounded-md border p-3">
        <div>
          <Label>Featured</Label>
          <p className="text-sm text-muted-foreground">Show this car on the home page.</p>
        </div>
        <Switch checked={form.watch("featured") ?? false} onCheckedChange={(checked) => form.setValue("featured", checked)} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : car ? "Update car" : "Add car"}
      </Button>
    </form>
  );
}

function normalizeNumber(value?: number) {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  return value;
}
