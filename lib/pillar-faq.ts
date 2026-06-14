import type { ServiceFaqItem } from "@/lib/types/faq";
import { mergeServiceFaq, type ServiceSlug } from "@/lib/seo/services";

function dedupeFaq(items: ServiceFaqItem[]): ServiceFaqItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.question.trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function mergePillarFaq(items: ServiceFaqItem[]): ServiceFaqItem[] {
  return dedupeFaq(items);
}

export function mergeLegacyFaq(pageFaq: ServiceFaqItem[], legacySlugs: ServiceSlug[]): ServiceFaqItem[] {
  let merged = [...pageFaq];
  for (const slug of legacySlugs) {
    merged = mergeServiceFaq(merged, slug);
  }
  return dedupeFaq(merged);
}
