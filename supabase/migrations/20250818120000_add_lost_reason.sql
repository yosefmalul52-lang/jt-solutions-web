-- Reason when a lead is marked as irrelevant (status = lost)
alter table public.leads
  add column if not exists lost_reason text;

comment on column public.leads.lost_reason is 'Optional reason when status is lost (לא רלוונטי)';
