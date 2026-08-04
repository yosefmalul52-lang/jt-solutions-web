export type DocumentKind = "invoice" | "quote";

export type InvoiceLine = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
};

export type InvoiceDoc = {
  kind: DocumentKind;
  orderNumber: string;
  date: string; // YYYY-MM-DD
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  lines: InvoiceLine[];
  taxPercent: number;
  thankYou: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  payBy: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
};

export function newLineId(): string {
  return `ln_${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyInvoice(kind: DocumentKind = "invoice"): InvoiceDoc {
  const now = new Date();
  const order =
    String(now.getFullYear()).slice(2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(Math.floor(Math.random() * 90) + 10);

  return {
    kind,
    orderNumber: order,
    date: now.toISOString().slice(0, 10),
    clientName: "",
    clientPhone: "",
    clientAddress: "",
    lines: [
      {
        id: newLineId(),
        description: kind === "quote" ? "פיתוח אתר עסקי" : "שירותי פיתוח דיגיטלי",
        qty: 1,
        unitPrice: 0,
      },
    ],
    taxPercent: 17,
    thankYou: "תודה!",
    bankName: "",
    accountName: "יוסף מלול / JT Solutions",
    accountNumber: "",
    payBy: "",
    companyName: "JT Solutions",
    companyEmail: "jtsolutions.officee@gmail.com",
    companyAddress: "ישראל",
    companyPhone: "052-8240230",
  };
}

export function lineTotal(line: InvoiceLine): number {
  return Math.max(0, Number(line.qty) || 0) * Math.max(0, Number(line.unitPrice) || 0);
}

export function subtotal(lines: InvoiceLine[]): number {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}

export function taxAmount(lines: InvoiceLine[], taxPercent: number): number {
  return subtotal(lines) * (Math.max(0, taxPercent) / 100);
}

export function grandTotal(lines: InvoiceLine[], taxPercent: number): number {
  return subtotal(lines) + taxAmount(lines, taxPercent);
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function formatInvoiceDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return d.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const kindLabels: Record<DocumentKind, string> = {
  invoice: "חשבונית",
  quote: "הצעת מחיר",
};

export const kindToLabel: Record<DocumentKind, string> = {
  invoice: "חשבונית ל־",
  quote: "הצעה ל־",
};

export const kindDateLabel: Record<DocumentKind, string> = {
  invoice: "תאריך חשבונית:",
  quote: "תאריך הצעה:",
};
