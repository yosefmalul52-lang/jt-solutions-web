export type ParsedMetaLeadFields = {
  name: string;
  phone: string;
  email: string | null;
  service: string;
  extraNotes: string[];
};

type MetaFieldDatum = {
  name: string;
  values: string[];
};

function firstValue(field: MetaFieldDatum): string {
  return field.values[0]?.trim() ?? "";
}

function matchesAny(haystack: string, needles: string[]): boolean {
  const lower = haystack.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

export function parseMetaLeadFieldData(fieldData: MetaFieldDatum[]): ParsedMetaLeadFields {
  let name = "";
  let phone = "";
  let email: string | null = null;
  let service = "";
  const extraNotes: string[] = [];

  for (const field of fieldData) {
    const label = field.name.trim();
    const value = firstValue(field);
    if (!value) continue;

    if (
      !name &&
      matchesAny(label, ["full_name", "fullname", "name", "first_name", "שם", "שם מלא"])
    ) {
      name = value;
      continue;
    }

    if (!phone && matchesAny(label, ["phone", "phone_number", "mobile", "טלפון", "נייד"])) {
      phone = value;
      continue;
    }

    if (!email && matchesAny(label, ["email", "e-mail", "אימייל", "דוא", "mail"])) {
      email = value;
      continue;
    }

    if (
      !service &&
      matchesAny(label, [
        "service",
        "interest",
        "project",
        "שירות",
        "מעניין",
        "סוג",
        "נושא",
        "מה",
      ])
    ) {
      service = value;
      continue;
    }

    extraNotes.push(`${label}: ${value}`);
  }

  return {
    name: name || "ליד Meta",
    phone,
    email,
    service: service || "ליד ממומן",
    extraNotes,
  };
}
