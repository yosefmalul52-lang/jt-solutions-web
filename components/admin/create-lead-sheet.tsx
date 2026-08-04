"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { leadSourceLabels } from "@/lib/admin/labels";
import type { LeadSource } from "@/lib/admin/types";

type CreateLeadSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function CreateLeadSheet({ open, onOpenChange }: CreateLeadSheetProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [service, setService] = React.useState("שיחת אבחון");
  const [source, setSource] = React.useState<LeadSource>("whatsapp");
  const [createdDate, setCreatedDate] = React.useState(todayInputValue);
  const [notes, setNotes] = React.useState("");

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setService("שיחת אבחון");
    setSource("whatsapp");
    setCreatedDate(todayInputValue());
    setNotes("");
    setError(null);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          service,
          source,
          notes: notes || undefined,
          createdAt: createdDate,
          createFollowUpTask: true,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "שמירה נכשלה");
        return;
      }
      reset();
      onOpenChange(false);
      router.refresh();
    } catch {
      setError("שגיאת רשת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <SheetContent side="left" className="w-full gap-0 sm:max-w-md" dir="rtl">
        <SheetHeader className="border-b border-slate-100 pe-12">
          <SheetTitle>ליד חדש</SheetTitle>
        </SheetHeader>
        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          <label className="text-sm font-medium text-slate-800">
            שם
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="text-sm font-medium text-slate-800">
            טלפון
            <Input
              className="mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              dir="ltr"
            />
          </label>
          <label className="text-sm font-medium text-slate-800">
            אימייל (אופציונלי)
            <Input
              className="mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
            />
          </label>
          <label className="text-sm font-medium text-slate-800">
            תאריך יצירה
            <Input
              className="mt-1"
              type="date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              required
            />
          </label>
          <label className="text-sm font-medium text-slate-800">
            שירות / צורך
            <Input className="mt-1" value={service} onChange={(e) => setService(e.target.value)} required />
          </label>
          <div className="text-sm font-medium text-slate-800">
            מקור
            <Select value={source} onValueChange={(v) => setSource(v as LeadSource)}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(leadSourceLabels) as LeadSource[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {leadSourceLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="text-sm font-medium text-slate-800">
            הערות
            <textarea
              className="mt-1 min-h-20 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <SheetFooter className="mt-auto px-0">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
            >
              {loading ? "שומר…" : "שמור ליד"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
