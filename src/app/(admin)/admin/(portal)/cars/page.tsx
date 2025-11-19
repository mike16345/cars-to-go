import { CarsService } from "@/modules/cars/CarsService";
import { AdminCarsTable } from "@/components/cars/AdminCarsTable";

export default async function AdminCarsPage() {
  const service = new CarsService();
  const cars = await service.listCars({});

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Cars</h1>
        <p className="text-sm text-muted-foreground">Manage inventory directly from the portal.</p>
      </div>
      <AdminCarsTable cars={cars} />
    </div>
  );
}
