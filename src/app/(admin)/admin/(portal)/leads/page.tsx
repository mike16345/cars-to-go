import { LeadsService } from "@/modules/leads/LeadsService";
import { AdminLeadsTable } from "@/components/admin/AdminLeadsTable";

export default async function AdminLeadsPage() {
  const service = new LeadsService();
  const leads = await service.listLeads();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="text-sm text-muted-foreground">Track inbound contact requests and their status.</p>
      </div>
      <AdminLeadsTable leads={leads} />
    </div>
  );
}
