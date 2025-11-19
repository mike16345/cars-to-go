"use client";

import { useState } from "react";
import type { Car } from "@prisma/client";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { formatCurrency, formatMileage } from "@/lib/utils/numberUtils";
import { formatDate } from "@/lib/utils/dateUtils";
import { CarForm } from "../forms/CarForm";

interface AdminCarsTableProps {
  cars: Car[];
}

export function AdminCarsTable({ cars }: AdminCarsTableProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (car?: Car) => {
    setSelectedCar(car ?? null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this car?")) {
      return;
    }

    await fetch(`/api/cars?id=${id}`, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openDialog()}>Add car</Button>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              <th className="p-3">Make</th>
              <th className="p-3">Model</th>
              <th className="p-3">Year</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Mileage</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-t">
                <td className="p-3 font-medium">{car.make}</td>
                <td className="p-3">{car.model}</td>
                <td className="p-3">{car.year}</td>
                <td className="p-3">{formatCurrency(car.price ?? undefined)}</td>
                <td className="p-3">{car.status}</td>
                <td className="p-3">{formatMileage(car.mileage)}</td>
                <td className="p-3">{formatDate(car.createdAt)}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(car)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCar ? "Edit car" : "Add car"}</DialogTitle>
          </DialogHeader>
          <CarForm
            car={selectedCar ?? undefined}
            onSuccess={() => {
              setIsDialogOpen(false);
              window.location.reload();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
