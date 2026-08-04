type CalendarEventInput = {
  title: string;
  dueDate: string;
  details?: string;
  location?: string;
};

/** All-day Google Calendar "add event" deep link (Asia/Jerusalem). */
export function googleCalendarUrl({
  title,
  dueDate,
  details,
  location,
}: CalendarEventInput): string {
  const start = toCompactDate(dueDate);
  const end = toCompactDate(addOneDay(dueDate));

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    ctz: "Asia/Jerusalem",
  });
  if (details?.trim()) params.set("details", details.trim());
  if (location?.trim()) params.set("location", location.trim());

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toCompactDate(isoOrDate: string): string {
  const d = parseDateOnly(isoOrDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function addOneDay(isoOrDate: string): string {
  const d = parseDateOnly(isoOrDate);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function parseDateOnly(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
