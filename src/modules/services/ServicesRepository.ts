import { DealerService } from "./services.types";

const DEFAULT_SERVICES: DealerService[] = [
  {
    id: "inspection",
    title: "Auction Inspection",
    description:
      "Full bumper-to-bumper inspection so you know exactly what was purchased before listing it for retail.",
    priceHint: "From $149",
    turnaround: "24 hours",
  },
  {
    id: "reconditioning",
    title: "Reconditioning & Detailing",
    description:
      "Interior/exterior detail, paint correction, and wheel refinishing to make auction cars shine like new.",
    priceHint: "From $299",
    turnaround: "2-3 days",
  },
  {
    id: "mechanical",
    title: "Mechanical Repairs",
    description:
      "Brake jobs, suspension refreshes, gasket replacements, and emissions work handled in-house.",
    priceHint: "Hourly shop rate",
    turnaround: "Same week",
  },
  {
    id: "title",
    title: "Title & Registration",
    description:
      "We take care of title transfers, paperwork, and temporary tags so customers can drive off fast.",
    priceHint: "Ask for quote",
    turnaround: "3-5 days",
  },
];

export class ServicesRepository {
  async list(): Promise<DealerService[]> {
    return DEFAULT_SERVICES;
  }
}
