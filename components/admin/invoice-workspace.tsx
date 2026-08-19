"use client";

import * as React from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceDocument } from "@/components/admin/invoice-document";
import {
  createEmptyInvoice,
  kindLabels,
  newLineId,
  type DocumentKind,
  type InvoiceDoc,
  type InvoiceLine,
} from "@/lib/admin/invoice";
import { cn } from "@/lib/utils";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export function InvoiceWorkspace() {
  const [doc, setDoc] = React.useState<InvoiceDoc>(() => createEmptyInvoice("invoice"));
  const [printing, setPrinting] = React.useState(false);
  const editorScrollRef = React.useRef<HTMLDivElement>(null);

  const patch = (partial: Partial<InvoiceDoc>) => {
    setDoc((prev) => ({ ...prev, ...partial }));
  };

  const setKind = (kind: DocumentKind) => {
    setDoc((prev) => ({ ...prev, kind }));
  };

  const updateLine = (id: string, partial: Partial<InvoiceLine>) => {
    setDoc((prev) => ({
      ...prev,
      lines: prev.lines.map((line) => (line.id === id ? { ...line, ...partial } : line)),
    }));
  };

  const addLine = () => {
    setDoc((prev) => ({
      ...prev,
      lines: [
        ...prev.lines,
        { id: newLineId(), description: "", qty: 1, unitPrice: 0 },
      ],
    }));
  };

  const removeLine = (id: string) => {
    setDoc((prev) => ({
      ...prev,
      lines: prev.lines.length <= 1 ? prev.lines : prev.lines.filter((l) => l.id !== id),
    }));
  };

  const resetDoc = (kind: DocumentKind = doc.kind) => {
    setDoc(createEmptyInvoice(kind));
  };

  const downloadPdf = () => {
    setPrinting(true);
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setPrinting(false), 400);
    }, 50);
  };

  return (
    <div
      className={cn(
        "invoice-workspace relative min-h-0 w-full flex-1",
        printing && "invoice-workspace--printing",
      )}
    >
      <div className="absolute inset-0 grid grid-rows-[minmax(0,40%)_minmax(0,1fr)] gap-3 overflow-hidden lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)]">
        <aside className="invoice-editor admin-surface flex h-full min-h-0 flex-col overflow-hidden p-0 print:hidden">
          <div className="shrink-0 border-b border-slate-100 p-3 pb-2">
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
              {(["invoice", "quote"] as DocumentKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setKind(kind)}
                  className={cn(
                    "h-8 flex-1 rounded-md text-sm font-medium transition-colors duration-150",
                    doc.kind === kind
                      ? "bg-[#1e3a8a] text-white"
                      : "text-slate-700 hover:bg-white",
                  )}
                >
                  {kindLabels[kind]}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={editorScrollRef}
            className="invoice-editor-scroll admin-scroll min-h-0 flex-1 px-3 py-3"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="space-y-4 pb-2">
              <section className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">מסמך</p>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="מספר הזמנה">
                    <Input
                      value={doc.orderNumber}
                      onChange={(e) => patch({ orderNumber: e.target.value })}
                      className="h-9"
                    />
                  </Field>
                  <Field label="תאריך">
                    <Input
                      type="date"
                      value={doc.date}
                      onChange={(e) => patch({ date: e.target.value })}
                      className="h-9"
                    />
                  </Field>
                </div>
                <Field label="מע״מ (%)">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={doc.taxPercent}
                    onChange={(e) => patch({ taxPercent: Number(e.target.value) || 0 })}
                    className="h-9"
                  />
                </Field>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">לקוח</p>
                <Field label="שם">
                  <Input
                    value={doc.clientName}
                    onChange={(e) => patch({ clientName: e.target.value })}
                    placeholder="שם העסק / הלקוח"
                    className="h-9"
                  />
                </Field>
                <Field label="טלפון">
                  <Input
                    value={doc.clientPhone}
                    onChange={(e) => patch({ clientPhone: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="כתובת">
                  <textarea
                    value={doc.clientAddress}
                    onChange={(e) => patch({ clientAddress: e.target.value })}
                    rows={2}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring"
                  />
                </Field>
              </section>

              <section className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-500">פריטים</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1"
                    onClick={addLine}
                  >
                    <Plus className="size-3.5" />
                    פריט
                  </Button>
                </div>
                <ul className="space-y-2">
                  {doc.lines.map((line, index) => (
                    <li
                      key={line.id}
                      className="space-y-2 rounded-md border border-slate-200 bg-white p-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-slate-500">#{index + 1}</span>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="size-7 text-slate-500 hover:text-red-700"
                          disabled={doc.lines.length <= 1}
                          onClick={() => removeLine(line.id)}
                          aria-label="מחק פריט"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                      <Input
                        value={line.description}
                        onChange={(e) => updateLine(line.id, { description: e.target.value })}
                        placeholder="תיאור השירות"
                        className="h-9"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="כמות">
                          <Input
                            type="number"
                            min={0}
                            step={1}
                            value={line.qty}
                            onChange={(e) =>
                              updateLine(line.id, { qty: Number(e.target.value) || 0 })
                            }
                            className="h-9"
                          />
                        </Field>
                        <Field label="מחיר יחידה">
                          <Input
                            type="number"
                            min={0}
                            step={50}
                            value={line.unitPrice}
                            onChange={(e) =>
                              updateLine(line.id, { unitPrice: Number(e.target.value) || 0 })
                            }
                            className="h-9"
                          />
                        </Field>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">תשלום וחברה</p>
                <Field label="ברכת סיום">
                  <Input
                    value={doc.thankYou}
                    onChange={(e) => patch({ thankYou: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="בנק">
                  <Input
                    value={doc.bankName}
                    onChange={(e) => patch({ bankName: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="שם חשבון">
                  <Input
                    value={doc.accountName}
                    onChange={(e) => patch({ accountName: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="מספר חשבון">
                  <Input
                    value={doc.accountNumber}
                    onChange={(e) => patch({ accountNumber: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="לתשלום עד">
                  <Input
                    value={doc.payBy}
                    onChange={(e) => patch({ payBy: e.target.value })}
                    placeholder="למשל 30 באוגוסט 2026"
                    className="h-9"
                  />
                </Field>
                <Field label="שם העסק">
                  <Input
                    value={doc.companyName}
                    onChange={(e) => patch({ companyName: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="אימייל">
                  <Input
                    value={doc.companyEmail}
                    onChange={(e) => patch({ companyEmail: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="טלפון עסק">
                  <Input
                    value={doc.companyPhone}
                    onChange={(e) => patch({ companyPhone: e.target.value })}
                    className="h-9"
                  />
                </Field>
                <Field label="כתובת עסק">
                  <Input
                    value={doc.companyAddress}
                    onChange={(e) => patch({ companyAddress: e.target.value })}
                    className="h-9"
                  />
                </Field>
              </section>
            </div>
          </div>

          <div className="shrink-0 space-y-2 border-t border-slate-100 bg-white p-3">
            <Button
              type="button"
              className="h-10 w-full gap-2 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
              onClick={downloadPdf}
            >
              <Download className="size-4" />
              הורד PDF
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-9 w-full"
              onClick={() => resetDoc()}
            >
              מסמך חדש
            </Button>
            <p className="text-center text-[11px] text-slate-500">
              בחלון ההדפסה בחרו &quot;Save as PDF&quot; / &quot;שמירה כ־PDF&quot;
            </p>
          </div>
        </aside>

        <section className="invoice-preview admin-scroll min-h-0 rounded-xl border border-slate-200 bg-slate-100/80 p-3 sm:p-5 print:border-0 print:bg-white print:p-0">
          <InvoiceDocument doc={doc} className="mx-auto shadow-sm print:shadow-none" />
        </section>
      </div>
    </div>
  );
}
