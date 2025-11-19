"use client";

import type { Lead } from "@prisma/client";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils/dateUtils";

type LeadWithCar = Lead & { car?: { make: string; model: string; year: number } | null };
type LeadStatusValue = "NEW" | "CONTACTED" | "CLOSED";

interface AdminLeadsTableProps {
  leads: LeadWithCar[];
}

export function AdminLeadsTable({ leads }: AdminLeadsTableProps) {
  const updateStatus = async (id: string, status: LeadStatusValue) => {
    await fetch(`/api/leads?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    window.location.reload();
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-muted/60 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Car</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-3 font-medium">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone ?? "-"}</td>
              <td className="p-3">
                {lead.car ? `${lead.car.year} ${lead.car.make} ${lead.car.model}` : "General"}
              </td>
              <td className="p-3">{lead.status}</td>
              <td className="p-3">{formatDate(lead.createdAt)}</td>
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  {lead.status !== "CONTACTED" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(lead.id, "CONTACTED")}>
                      Mark contacted
                    </Button>
                  )}
                  {lead.status !== "CLOSED" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(lead.id, "CLOSED")}>
                      Close
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
