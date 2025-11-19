import { CarsService } from "@/modules/cars/CarsService";
import { LeadsService } from "@/modules/leads/LeadsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/numberUtils";

export default async function AdminDashboardPage() {
  const carsService = new CarsService();
  const leadsService = new LeadsService();
  const cars = await carsService.listCars({});
  const leads = await leadsService.listLeads();
  const availableInventoryValue = cars
    .filter((car) => car.price && car.status === "AVAILABLE")
    .reduce((sum, car) => sum + (car.price ?? 0), 0);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total cars</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{cars.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Open leads</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{leads.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Available inventory value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(availableInventoryValue, "$0")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
