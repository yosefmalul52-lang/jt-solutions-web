"use client";

import { useReducedMotion } from "framer-motion";
import SectionShell from "@/components/ui/SectionShell";
import { useHydrated } from "@/hooks/useHydrated";
import { clienteleLogos, type ClienteleItem } from "@/lib/clients";

/** Repeat logos so each marquee group always overflows the viewport */
const MARQUEE_SEQUENCE = [...clienteleLogos, ...clienteleLogos, ...clienteleLogos];

function ClientLogoCell({ label, logoSrc, variant = "sans" }: ClienteleItem) {
  if (logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logoSrc} alt={label} className="clientele-grid__logo" decoding="async" draggable={false} />
    );
  }

  return (
    <span className={`clientele-grid__wordmark clientele-grid__wordmark--${variant}`}>{label}</span>
  );
}

function ClientCell({ client }: { client: ClienteleItem }) {
  return (
    <div className="clientele-grid__frame">
      <div className="clientele-grid__cell">
        <ClientLogoCell {...client} />
      </div>
    </div>
  );
}

function MarqueeGroup({ clients, hidden = false }: { clients: ClienteleItem[]; hidden?: boolean }) {
  return (
    <div className="clientele-tunnel__group" aria-hidden={hidden || undefined}>
      {clients.map((client, index) => (
        <ClientCell key={`${client.id}-${index}`} client={client} />
      ))}
    </div>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="clientele-tunnel__row-wrap">
      <div className={`clientele-tunnel__track ${reverse ? "clientele-tunnel__track--reverse" : ""}`}>
        <MarqueeGroup clients={MARQUEE_SEQUENCE} />
        <MarqueeGroup clients={MARQUEE_SEQUENCE} hidden />
      </div>
    </div>
  );
}

export default function ClienteleGrid() {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const isStatic = !hydrated || reduceMotion;

  return (
    <SectionShell
      id="clients"
      ariaLabel="הקליינטורה שלנו"
      className="!bg-[#06060a] py-14 md:py-16 lg:py-20"
      style={{ background: "#06060a" }}
    >
      <div dir="rtl">
        <h2 className="premium-title clientele-grid__title">הקליינטורה שלנו</h2>

        <div
          className={`clientele-tunnel${isStatic ? " clientele-tunnel--static" : ""}`}
          role="list"
          aria-label="לוגואים של לקוחות"
          suppressHydrationWarning
        >
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </div>
    </SectionShell>
  );
}
