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
import type { Lead } from "@/lib/admin/types";

type CreateTaskSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leads: Lead[];
};

export function CreateTaskSheet({ open, onOpenChange, leads }: CreateTaskSheetProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("שיחת אבחון");
  const [leadId, setLeadId] = React.useState<string>("none");
  const [dueDate, setDueDate] = React.useState(() => new Date().toISOString().slice(0, 10));

  const reset = () => {
    setTitle("שיחת אבחון");
    setLeadId("none");
    setDueDate(new Date().toISOString().slice(0, 10));
    setError(null);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          leadId: leadId === "none" ? null : leadId,
          dueDate,
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
      <SheetContent side="left" className="w-full sm:max-w-md" dir="rtl">
        <SheetHeader>
          <SheetTitle>משימה חדשה</SheetTitle>
        </SheetHeader>
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-3 px-4 pb-4">
          <label className="text-sm font-medium text-slate-800">
            כותרת
            <Input className="mt-1" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <div className="text-sm font-medium text-slate-800">
            ליד מקושר
            <Select value={leadId} onValueChange={setLeadId}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="בחר ליד" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">ללא</SelectItem>
                {leads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="text-sm font-medium text-slate-800">
            תאריך יעד
            <Input
              className="mt-1"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <SheetFooter className="mt-auto px-0">
            <Button type="submit" disabled={loading} className="bg-[#1e3a8a] text-white hover:bg-[#1e40af]">
              {loading ? "שומר…" : "שמור משימה"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
