import { ContactForm } from "@/components/forms/ContactForm";

interface ContactPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const carIdParam = searchParams.carId;
  const carId = Array.isArray(carIdParam) ? carIdParam[0] : carIdParam;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm uppercase text-muted-foreground">Get in touch</p>
        <h1 className="text-4xl font-bold">Let us know what you need</h1>
        <p className="text-muted-foreground">
          Whether you have your eye on a car in our inventory or need reconditioning help, send a quick note and we will respond within a business day.
        </p>
      </div>
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <ContactForm carId={carId} />
      </div>
    </div>
  );
}
