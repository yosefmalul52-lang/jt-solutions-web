export type CsvLeadField =
  | "skip"
  | "name"
  | "phone"
  | "email"
  | "service"
  | "source"
  | "status"
  | "createdAt"
  | "notes";

export const csvLeadFieldLabels: Record<CsvLeadField, string> = {
  skip: "- התעלם -",
  name: "שם",
  phone: "טלפון",
  email: "אימייל",
  service: "שירות",
  source: "מקור",
  status: "סטטוס",
  createdAt: "תאריך יצירה",
  notes: "הערות",
};

const HEADER_ALIASES: Record<CsvLeadField, string[]> = {
  skip: [],
  name: ["name", "שם", "full name", "fullname", "שם מלא", "client", "לקוח"],
  phone: ["phone", "טלפון", "mobile", "נייד", "cell", "tel", "telephone", "מספר טלפון"],
  email: ["email", "אימייל", "e-mail", "mail", "מייל"],
  service: ["service", "שירות", "interest", "עניין", "product", "מוצר"],
  source: ["source", "מקור", "channel", "ערוץ"],
  status: ["status", "סטטוס", "state"],
  createdAt: [
    "created",
    "created_at",
    "created at",
    "date",
    "תאריך",
    "תאריך יצירה",
    "תאריך פנייה",
    "תאריך ליד",
  ],
  notes: ["notes", "הערות", "note", "comment", "הערה", "comments"],
};

function detectDelimiter(firstLine: string): "," | ";" | "\t" {
  const commas = (firstLine.match(/,/g) ?? []).length;
  const semis = (firstLine.match(/;/g) ?? []).length;
  const tabs = (firstLine.match(/\t/g) ?? []).length;
  if (tabs >= commas && tabs >= semis && tabs > 0) return "\t";
  if (semis > commas) return ";";
  return ",";
}

/** Parse one CSV line respecting quoted fields. */
function splitCsvLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === delimiter) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

export type ParsedCsv = {
  headers: string[];
  rows: string[][];
};

export function parseCsv(text: string): ParsedCsv {
  const cleaned = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = cleaned.split("\n").filter((line) => line.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  const delimiter = detectDelimiter(lines[0]);
  const headers = splitCsvLine(lines[0], delimiter);
  const rows = lines.slice(1).map((line) => {
    const cells = splitCsvLine(line, delimiter);
    while (cells.length < headers.length) cells.push("");
    return cells.slice(0, headers.length);
  });

  return { headers, rows };
}

export function guessFieldMapping(headers: string[]): CsvLeadField[] {
  const used = new Set<CsvLeadField>();
  return headers.map((header) => {
    const normalized = header.trim().toLowerCase();
    for (const [field, aliases] of Object.entries(HEADER_ALIASES) as [
      CsvLeadField,
      string[],
    ][]) {
      if (field === "skip" || used.has(field)) continue;
      if (aliases.some((alias) => alias === normalized || normalized.includes(alias))) {
        used.add(field);
        return field;
      }
    }
    return "skip";
  });
}

export function mapRowToRecord(
  row: string[],
  mapping: CsvLeadField[],
): Partial<Record<Exclude<CsvLeadField, "skip">, string>> {
  const out: Partial<Record<Exclude<CsvLeadField, "skip">, string>> = {};
  mapping.forEach((field, index) => {
    if (field === "skip") return;
    const value = row[index]?.trim() ?? "";
    if (!value) return;
    if (!out[field]) out[field] = value;
  });
  return out;
}

/** Parse CSV date cell → ISO timestamp (local noon) or null if invalid. */
export function parseImportDate(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;

  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s);
  if (iso) {
    const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]), 12, 0, 0, 0);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }

  const dmy = /^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/.exec(s);
  if (dmy) {
    let year = Number(dmy[3]);
    if (year < 100) year += 2000;
    const d = new Date(year, Number(dmy[2]) - 1, Number(dmy[1]), 12, 0, 0, 0);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }

  const parsed = Date.parse(s);
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();

  return null;
}

export function formatImportDatePreview(raw?: string): string | null {
  if (!raw?.trim()) return null;
  const iso = parseImportDate(raw);
  if (!iso) return raw;
  return new Date(iso).toLocaleDateString("he-IL");
}
