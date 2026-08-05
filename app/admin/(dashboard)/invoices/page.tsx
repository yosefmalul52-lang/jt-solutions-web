import { DashboardTopbar } from "@/components/admin/dashboard-topbar";
import { InvoiceWorkspace } from "@/components/admin/invoice-workspace";

export default function AdminInvoicesPage() {
  return (
    <main className="invoice-page flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <div className="shrink-0 print:hidden">
        <DashboardTopbar title="חשבוניות והצעות מחיר" showLeadFilters={false} />
      </div>
      <div className="relative min-h-0 w-full flex-1 overflow-hidden pt-3 print:overflow-visible print:pt-0">
        <InvoiceWorkspace />
      </div>
    </main>
  );
}
