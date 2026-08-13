import {
  formatInvoiceDate,
  formatMoney,
  grandTotal,
  kindDateLabel,
  kindLabels,
  kindToLabel,
  lineTotal,
  subtotal,
  taxAmount,
  type InvoiceDoc,
} from "@/lib/admin/invoice";
import { cn } from "@/lib/utils";

type InvoiceDocumentProps = {
  doc: InvoiceDoc;
  className?: string;
};

export function InvoiceDocument({ doc, className }: InvoiceDocumentProps) {
  const sub = subtotal(doc.lines);
  const tax = taxAmount(doc.lines, doc.taxPercent);
  const total = grandTotal(doc.lines, doc.taxPercent);

  return (
    <article
      id="invoice-print-root"
      dir="rtl"
      lang="he"
      className={cn("invoice-doc bg-white text-black", className)}
    >
      <header className="invoice-doc__header">
        <div>
          <p className="invoice-doc__label">מספר הזמנה:</p>
          <p className="invoice-doc__order">#{doc.orderNumber || "-"}</p>
        </div>
        <h1 className="invoice-doc__title">{kindLabels[doc.kind]}</h1>
      </header>

      <div className="invoice-doc__rule" />

      <section className="invoice-doc__meta">
        <div>
          <p className="invoice-doc__label">{kindToLabel[doc.kind]}</p>
          <p className="invoice-doc__client-name">{doc.clientName || "שם הלקוח"}</p>
          {doc.clientPhone ? <p className="invoice-doc__muted">{doc.clientPhone}</p> : null}
          {doc.clientAddress ? (
            <p className="invoice-doc__muted whitespace-pre-line">{doc.clientAddress}</p>
          ) : null}
        </div>
        <div className="invoice-doc__date-block">
          <p className="invoice-doc__label">{kindDateLabel[doc.kind]}</p>
          <p className="invoice-doc__muted">{formatInvoiceDate(doc.date)}</p>
        </div>
      </section>

      <table className="invoice-doc__table">
        <thead>
          <tr>
            <th className="invoice-doc__th invoice-doc__th--item">פריט</th>
            <th className="invoice-doc__th invoice-doc__th--qty">כמות</th>
            <th className="invoice-doc__th invoice-doc__th--price">מחיר יחידה</th>
            <th className="invoice-doc__th invoice-doc__th--total">סה״כ</th>
          </tr>
        </thead>
        <tbody>
          {doc.lines.map((line) => (
            <tr key={line.id}>
              <td className="invoice-doc__td invoice-doc__td--item">
                {line.description || "-"}
              </td>
              <td className="invoice-doc__td invoice-doc__td--qty">{line.qty || 0}</td>
              <td className="invoice-doc__td invoice-doc__td--price">
                {formatMoney(line.unitPrice)}
              </td>
              <td className="invoice-doc__td invoice-doc__td--total">
                {formatMoney(lineTotal(line))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="invoice-doc__totals">
        <div className="invoice-doc__totals-row">
          <span className="invoice-doc__totals-label">סה״כ ביניים</span>
          <span>{formatMoney(sub)}</span>
        </div>
        <div className="invoice-doc__totals-row invoice-doc__totals-row--muted">
          <span>מע״מ ({doc.taxPercent}%)</span>
          <span>{formatMoney(tax)}</span>
        </div>
        <div className="invoice-doc__rule invoice-doc__rule--short" />
        <div className="invoice-doc__totals-row invoice-doc__totals-row--grand">
          <span>סה״כ</span>
          <span>{formatMoney(total)}</span>
        </div>
      </section>

      <p className="invoice-doc__thanks">{doc.thankYou || "תודה!"}</p>

      <footer className="invoice-doc__footer">
        <div>
          <p className="invoice-doc__footer-title">פרטי תשלום</p>
          {doc.bankName ? <p>בנק: {doc.bankName}</p> : null}
          {doc.accountName ? <p>שם חשבון: {doc.accountName}</p> : null}
          {doc.accountNumber ? <p>מספר חשבון: {doc.accountNumber}</p> : null}
          {doc.payBy ? <p>לתשלום עד: {doc.payBy}</p> : null}
          {!doc.bankName && !doc.accountNumber && !doc.payBy ? (
            <p className="invoice-doc__muted">השלם פרטי תשלום בעורך</p>
          ) : null}
        </div>
        <div className="invoice-doc__company">
          <p className="invoice-doc__footer-title">{doc.companyName}</p>
          {doc.companyEmail ? <p>{doc.companyEmail}</p> : null}
          {doc.companyPhone ? <p>{doc.companyPhone}</p> : null}
          {doc.companyAddress ? <p>{doc.companyAddress}</p> : null}
        </div>
      </footer>
    </article>
  );
}
