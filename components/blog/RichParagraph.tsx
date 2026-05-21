import Link from "next/link";
import type { ReactNode } from "react";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export default function RichParagraph({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const href = match[2];
    const label = match[1];
    if (href.startsWith("/")) {
      parts.push(
        <Link key={`${href}-${match.index}`} href={href} className="font-semibold text-indigo-600 hover:underline">
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a key={`${href}-${match.index}`} href={href} className="font-semibold text-indigo-600 hover:underline">
          {label}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  if (parts.length === 0) {
    return <>{text}</>;
  }

  return <>{parts}</>;
}
