export type CurvedPortfolioProject = {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  href: string;
  mockupClass: string;
  imageSrc?: string;
};

export const curvedPortfolioProjects: CurvedPortfolioProject[] = [
  {
    id: "magadim",
    title: "מגדים קייטרינג",
    type: "אתר תדמית / הזמנות",
    description:
      "אתר שמציג תפריטים, אירועים ושירותי קייטרינג בצורה ברורה ומובילה לפנייה.",
    tags: ["אתר תדמית", "קייטרינג", "UX"],
    href: "/projects/magadim",
    mockupClass: "mockup--catering",
    imageSrc: "/projects/magadim.png",
  },
  {
    id: "tsameret-glass",
    title: "צמרת הזכוכית",
    type: "אתר לבעל מקצוע",
    description:
      "אתר פרימיום לעבודות זכוכית עם הצגת שירותים, אמינות ותמונות עבודה.",
    tags: ["זכוכית", "לידים", "מיתוג"],
    href: "/projects",
    mockupClass: "mockup--glass",
  },
  {
    id: "financial-advisory",
    title: "ייעוץ פיננסי",
    type: "דף נחיתה",
    description: "דף נחיתה ממוקד שמסביר את הערך מהר ומוביל להשארת פרטים.",
    tags: ["דף נחיתה", "קמפיין", "לידים"],
    href: "/projects",
    mockupClass: "mockup--landing",
  },
  {
    id: "fashion-store",
    title: "חנות בגדי נשים",
    type: "חנות אונליין",
    description: "חנות אינטרנטית נקייה עם חווית קנייה פשוטה וברורה.",
    tags: ["Ecommerce", "אופנה", "מכירות"],
    href: "/projects/eb-hair",
    mockupClass: "mockup--ecommerce",
    imageSrc: "/projects/eb-hair.png",
  },
  {
    id: "lead-management",
    title: "מערכת ניהול לידים",
    type: "אוטומציה / CRM",
    description: "מערכת שמרכזת פניות, סטטוסים ומשימות כדי שלא יאבדו לידים.",
    tags: ["CRM", "אוטומציה", "ניהול"],
    href: "/projects/ai-automation",
    mockupClass: "mockup--dashboard",
    imageSrc: "/projects/ai-automation.png",
  },
];
