import { ContactForm } from "@/components/forms/ContactForm";

interface ContactPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const carIdParam = searchParams.carId;
  const carId = Array.isArray(carIdParam) ? carIdParam[0] : carIdParam;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6 rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-8 shadow-xl shadow-primary/10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Get in touch</p>
        <h1 className="text-4xl font-semibold leading-tight">Let us know what you need</h1>
        <p className="text-lg text-muted-foreground">
          Whether you have your eye on a car in our inventory or need reconditioning help, send a quick note and we will respond within a business day.
        </p>
        <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-card/90 p-4">
            <p className="text-xs uppercase tracking-wide text-primary">Store hours</p>
            <p className="text-foreground">Mon-Sat · 9a-6p</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card/90 p-4">
            <p className="text-xs uppercase tracking-wide text-primary">Phone</p>
            <p className="text-foreground">(555) 987-1234</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-primary/10 bg-card/95 p-6 shadow-lg shadow-primary/5">
        <ContactForm carId={carId} />
      </div>
    </div>
  );
}
