export type ClienteleItem = {
  id: string;
  /** Display name when no logo image is set */
  label: string;
  /** Optional logo in /public/clients/ — rendered white via CSS filter */
  logoSrc?: string;
  /** Text wordmark style when logoSrc is omitted */
  variant?: "sans" | "bold" | "script" | "caps" | "light";
};

/** Homepage clientele grid — swap labels or add logoSrc as assets arrive */
export const clienteleLogos: ClienteleItem[] = [
  { id: "magadim", label: "Magadim", variant: "script" },
  { id: "eb-hair", label: "EB Hair", variant: "bold" },
  { id: "client-3", label: "EYELASHES PRO", variant: "caps" },
  { id: "client-4", label: "Well | איכילוב", variant: "sans" },
  { id: "client-5", label: "Super Jeep", variant: "bold" },
  { id: "client-6", label: "Hubazelet", variant: "light" },
  { id: "client-7", label: "joya", variant: "script" },
  { id: "client-8", label: "NEO", variant: "caps" },
  { id: "client-9", label: "TNUPORT", variant: "sans" },
  { id: "client-10", label: "ISRAVÉLO", variant: "light" },
];
