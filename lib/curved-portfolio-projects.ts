export type CurvedPortfolioProject = {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  href: string;
  mockupClass: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const curvedPortfolioProjects: CurvedPortfolioProject[] = [
  {
    id: "magadim",
    title: "מגדים קייטרינג",
    type: "אתר תדמית / הזמנות",
    description:
      "אתר שמציג תפריטים, אירועים ושירותי קייטרינג בצורה ברורה ומובילה לפנייה.",
    tags: ["אתר תדמית", "קייטרינג", "UX"],
    href: "/#contact",
    mockupClass: "mockup--catering",
    imageSrc: "/projects/magadim.webp",
    imageWidth: 1024,
    imageHeight: 589,
  },
  {
    id: "tsameret-glass",
    title: "צמרת הזכוכית",
    type: "אתר לבעל מקצוע",
    description:
      "אתר פרימיום לעבודות זכוכית עם הצגת שירותים, אמינות ותמונות עבודה.",
    tags: ["זכוכית", "לידים", "מיתוג"],
    href: "/#contact",
    mockupClass: "mockup--glass",
    imageSrc: "/projects/tsameret-glass.webp",
    imageWidth: 1024,
    imageHeight: 588,
  },
  {
    id: "financial-advisory",
    title: "ייעוץ פיננסי",
    type: "דף נחיתה",
    description: "דף נחיתה ממוקד שמסביר את הערך מהר ומוביל להשארת פרטים.",
    tags: ["דף נחיתה", "קמפיין", "לידים"],
    href: "/#contact",
    mockupClass: "mockup--landing",
    imageSrc: "/projects/md-finance.webp",
    imageWidth: 1024,
    imageHeight: 588,
  },
  {
    id: "fashion-store",
    title: "חנות בגדי נשים",
    type: "חנות אונליין",
    description: "חנות אינטרנטית נקייה עם חווית קנייה פשוטה וברורה.",
    tags: ["Ecommerce", "אופנה", "מכירות"],
    href: "/#contact",
    mockupClass: "mockup--ecommerce",
    imageSrc: "/projects/fashion-store.webp",
    imageWidth: 1024,
    imageHeight: 589,
  },
  {
    id: "lead-management",
    title: "מערכת ניהול לידים",
    type: "אוטומציה / CRM",
    description: "מערכת שמרכזת פניות, סטטוסים ומשימות כדי שלא יאבדו לידים.",
    tags: ["CRM", "אוטומציה", "ניהול"],
    href: "/#contact",
    mockupClass: "mockup--dashboard",
    imageSrc: "/projects/ai-automation.webp",
    imageWidth: 1400,
    imageHeight: 788,
  },
];
