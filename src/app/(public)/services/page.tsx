import { ServicesController } from "@/modules/services/ServicesController";

export default async function ServicesPage() {
  const controller = new ServicesController();
  const services = await controller.list();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase text-muted-foreground">Repair & recon</p>
        <h1 className="text-4xl font-bold">Services</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.data.map((service) => (
          <div key={service.id} className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <span className="text-sm text-muted-foreground">{service.priceHint}</span>
            </div>
            <p className="mt-3 text-muted-foreground">{service.description}</p>
            <p className="mt-2 text-sm font-medium">Turnaround: {service.turnaround}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
