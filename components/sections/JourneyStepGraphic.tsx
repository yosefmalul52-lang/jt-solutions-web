import type { CSSProperties } from "react";

type JourneyGraphicId =
  | "campaign"
  | "site"
  | "lead"
  | "crm"
  | "track";

type JourneyStepGraphicProps = {
  id: JourneyGraphicId;
  accent: string;
};

const IMAGE_GRAPHICS: Record<JourneyGraphicId, string> = {
  campaign: "/journey/tgooglexmeta.png",
  site: "/journey/sites2.png",
  lead: "/journey/lead.png",
  crm: "/journey/crm-v3.png",
  track: "/journey/card-total-revenue.png",
};

export default function JourneyStepGraphic({ id, accent }: JourneyStepGraphicProps) {
  const imageSrc = IMAGE_GRAPHICS[id];

  return (
    <div
      className={`stjourney-leader__graphic stjourney-leader__graphic--image${
        id === "site" ? " stjourney-leader__graphic--image-fill" : ""
      }${id === "crm" ? " stjourney-leader__graphic--image-fill stjourney-leader__graphic--image-crm" : ""}${
        id === "lead" ? " stjourney-leader__graphic--image-lead" : ""
      }${id === "track" ? " stjourney-leader__graphic--image-track" : ""}`}
      style={{ "--graphic-accent": accent } as CSSProperties}
      aria-hidden
    >
      <img src={imageSrc} alt="" className="stjourney-leader__graphic-img" />
    </div>
  );
}
