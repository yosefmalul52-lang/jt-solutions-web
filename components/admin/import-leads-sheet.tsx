"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  csvLeadFieldLabels,
  formatImportDatePreview,
  guessFieldMapping,
  mapRowToRecord,
  parseCsv,
  type CsvLeadField,
  type ParsedCsv,
} from "@/lib/admin/csv";

type ImportLeadsSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "upload" | "map" | "done";

const FIELD_OPTIONS = Object.entries(csvLeadFieldLabels) as [CsvLeadField, string][];

export function ImportLeadsSheet({ open, onOpenChange }: ImportLeadsSheetProps) {
  const router = useRouter();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [step, setStep] = React.useState<Step>("upload");
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [parsed, setParsed] = React.useState<ParsedCsv | null>(null);
  const [mapping, setMapping] = React.useState<CsvLeadField[]>([]);
  const [createTasks, setCreateTasks] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<{
    imported: number;
    skipped: number;
    errors: { row: number; error: string }[];
  } | null>(null);

  const reset = () => {
    setStep("upload");
    setFileName(null);
    setParsed(null);
    setMapping([]);
    setCreateTasks(false);
    setLoading(false);
    setError(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onFile = async (file: File | null) => {
    if (!file) return;
    setError(null);
    setResult(null);
    try {
      const text = await file.text();
      const csv = parseCsv(text);
      if (csv.headers.length === 0 || csv.rows.length === 0) {
        setError("הקובץ ריק או לא תקין");
        return;
      }
      if (csv.rows.length > 500) {
        setError("מקסימום 500 שורות לייבוא");
        return;
      }
      setFileName(file.name);
      setParsed(csv);
      setMapping(guessFieldMapping(csv.headers));
      setStep("map");
    } catch {
      setError("לא ניתן לקרוא את הקובץ");
    }
  };

  const hasName = mapping.includes("name");
  const hasPhone = mapping.includes("phone");

  const previewRows = React.useMemo(() => {
    if (!parsed) return [];
    return parsed.rows.slice(0, 3).map((row) => mapRowToRecord(row, mapping));
  }, [parsed, mapping]);

  const onImport = async () => {
    if (!parsed || !hasName || !hasPhone) return;
    setLoading(true);
    setError(null);
    try {
      const rows = parsed.rows
        .map((row) => mapRowToRecord(row, mapping))
        .filter((r) => r.name && r.phone)
        .map((r) => ({
          name: r.name!,
          phone: r.phone!,
          email: r.email,
          service: r.service,
          source: r.source,
          status: r.status,
          createdAt: r.createdAt,
          notes: r.notes,
        }));

      if (rows.length === 0) {
        setError("אין שורות עם שם וטלפון");
        return;
      }

      const res = await fetch("/api/admin/leads/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, createFollowUpTasks: createTasks }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
        imported?: number;
        skipped?: number;
        errors?: { row: number; error: string }[];
      };
      if (!res.ok || !data.success) {
        setError(data.error ?? "ייבוא נכשל");
        if (data.errors?.length) {
          setResult({
            imported: data.imported ?? 0,
            skipped: data.skipped ?? data.errors.length,
            errors: data.errors,
          });
        }
        return;
      }
      setResult({
        imported: data.imported ?? rows.length,
        skipped: data.skipped ?? 0,
        errors: data.errors ?? [],
      });
      setStep("done");
      router.refresh();
    } catch {
      setError("שגיאת רשת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="w-full gap-0 sm:max-w-lg"
        showCloseButton
      >
        <SheetHeader className="border-b border-slate-100">
          <SheetTitle>ייבוא לידים מ-CSV</SheetTitle>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-4">
          {step === "upload" ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-slate-600">
                העלה קובץ CSV עם כותרות. בשלב הבא תמפה עמודות לשדות במערכת — כולל{" "}
                <span className="font-medium text-slate-800">תאריך יצירה</span> אופציונלי.
              </p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100"
              >
                <FileUp className="size-8 text-slate-500" />
                <span className="text-sm font-medium">בחר קובץ CSV</span>
                <span className="text-xs text-slate-500">עד 500 שורות · פסיק / נקודה-פסיק</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
              />
            </div>
          ) : null}

          {step === "map" && parsed ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <span className="font-medium">{fileName}</span>
                <span className="text-slate-500"> · {parsed.rows.length} שורות</span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-900">מיפוי עמודות</p>
                <p className="text-xs text-slate-500">
                  חובה: שם וטלפון · אופציונלי: תאריך יצירה (2026-08-04 או 04/08/2026)
                </p>
                <ul className="space-y-2">
                  {parsed.headers.map((header, index) => (
                    <li
                      key={`${header}-${index}`}
                      className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-2"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm text-slate-800" title={header}>
                        {header || `עמודה ${index + 1}`}
                      </span>
                      <Select
                        value={mapping[index] ?? "skip"}
                        onValueChange={(value) => {
                          setMapping((prev) => {
                            const next = [...prev];
                            next[index] = value as CsvLeadField;
                            return next;
                          });
                        }}
                      >
                        <SelectTrigger className="h-8 w-36 shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[90]">
                          {FIELD_OPTIONS.map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </li>
                  ))}
                </ul>
              </div>

              {previewRows.length > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-slate-900">תצוגה מקדימה</p>
                  <div className="space-y-1.5 rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-700">
                    {previewRows.map((row, i) => (
                      <div key={i} className="border-b border-slate-100 pb-1.5 last:border-0 last:pb-0">
                        {row.name ?? "—"} · {row.phone ?? "—"}
                        {row.createdAt ? (
                          <> · {formatImportDatePreview(row.createdAt) ?? row.createdAt}</>
                        ) : null}
                        {row.email ? ` · ${row.email}` : ""}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <label className="flex items-center gap-2 text-sm text-slate-800">
                <input
                  type="checkbox"
                  className="size-3.5 accent-[#1e3a8a]"
                  checked={createTasks}
                  onChange={(e) => setCreateTasks(e.target.checked)}
                />
                צור משימת מעקב לכל ליד
              </label>
            </div>
          ) : null}

          {step === "done" && result ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-800">
                יובאו <span className="font-semibold text-emerald-700">{result.imported}</span> לידים
                {result.skipped > 0 ? (
                  <>
                    {" "}
                    · דולגו <span className="font-semibold text-amber-700">{result.skipped}</span>
                  </>
                ) : null}
              </p>
              {result.errors.length > 0 ? (
                <ul className="max-h-40 space-y-1 overflow-auto rounded-md border border-amber-100 bg-amber-50 p-2 text-xs text-amber-900">
                  {result.errors.map((e) => (
                    <li key={`${e.row}-${e.error}`}>
                      שורה {e.row}: {e.error}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        <SheetFooter className="border-t border-slate-100">
          {step === "upload" ? (
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              סגור
            </Button>
          ) : null}
          {step === "map" ? (
            <div className="flex w-full gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={loading}
                onClick={() => {
                  reset();
                  setStep("upload");
                }}
              >
                חזרה
              </Button>
              <Button
                type="button"
                className="flex-1 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
                disabled={loading || !hasName || !hasPhone}
                onClick={() => void onImport()}
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                ייבא {parsed?.rows.length ?? 0}
              </Button>
            </div>
          ) : null}
          {step === "done" ? (
            <Button
              type="button"
              className="bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
              onClick={() => handleOpenChange(false)}
            >
              סיום
            </Button>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
