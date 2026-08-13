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

/** Display assets capped ~1600w WebP for carousel LCP/bandwidth. */
export const curvedPortfolioProjects: CurvedPortfolioProject[] = [
  {
    id: "magadim",
    title: "מגדים קייטרינג",
    type: "אתר קייטרינג / הזמנות אונליין",
    description:
      "אתר קייטרינג מלא - תפריטים לאירועים ושבתות, לצד אפשרות לרכוש אוכל מוכן ישירות מהאתר ולהזמין בקלות.",
    tags: ["אתר תדמית", "קייטרינג", "הזמנות אונליין"],
    href: "https://www.megadim-catering.com/",
    mockupClass: "mockup--catering",
    imageSrc: "/projects/megadim.webp",
    imageWidth: 1600,
    imageHeight: 905,
  },
  {
    id: "tsameret-glass",
    title: "צמרת הזכוכית",
    type: "אתר לבעל מקצוע / זכוכית אדריכלית",
    description:
      "אתר פרימיום לעבודות זכוכית אדריכלית - מקלחונים, מראות LED, מחיצות וחדרי ישיבות, עם הצגת שירותים ברורה ומעבר מהיר להצעת מחיר.",
    tags: ["זכוכית", "לידים", "מיתוג"],
    href: "https://www.tzameret-glass.com/",
    mockupClass: "mockup--glass",
    imageSrc: "/projects/tsameret-glass.webp",
    imageWidth: 1600,
    imageHeight: 907,
  },
  {
    id: "financial-advisory",
    title: "FinUnit",
    type: "דף נחיתה / ייעוץ פיננסי",
    description:
      "דף נחיתה לייעוץ פיננסי אישי - מסביר במהירות איך בונים שליטה בתזרים, מציב מטרות ברורות, ומזמין לשיחת אפיון ראשונית ללא עלות.",
    tags: ["דף נחיתה", "פיננסים", "לידים"],
    href: "https://www.meirdahanfinance.co.il/",
    mockupClass: "mockup--landing",
    imageSrc: "/projects/finunit.webp",
    imageWidth: 1600,
    imageHeight: 906,
  },
  {
    id: "fashion-store",
    title: "אותנטי",
    type: "חנות אונליין / אופנת נשים",
    description:
      "חנות אינטרנטית לאופנת נשים - קטלוג נקי, חווית קנייה פשוטה במובייל, ומסלול ברור מרפרוף בפריטים ועד רכישה.",
    tags: ["Ecommerce", "אופנה", "מכירות"],
    href: "https://www.otenti-fashion.co.il/",
    mockupClass: "mockup--ecommerce",
    imageSrc: "/projects/otenti-store.webp",
    imageWidth: 1600,
    imageHeight: 905,
  },
  {
    id: "pura-shalom",
    title: "Pura Shalom",
    type: "אתר תדמית / נופש כשר",
    description:
      "אתר פרימיום לנופש כשר בקוסטה ריקה - חוויית ריזורט, חדרים ובקתות, והזמנה מסודרת במקום אחד עם שפה יוקרתית וברורה.",
    tags: ["אתר תדמית", "נופש", "מיתוג"],
    href: "/#contact",
    mockupClass: "mockup--landing",
    imageSrc: "/projects/costa-rica-hotel.webp",
    imageWidth: 1600,
    imageHeight: 907,
  },
  {
    id: "finunit",
    title: "FinUnit Business",
    type: "דף נחיתה / ייעוץ פיננסי לעסקים",
    description:
      "דף נחיתה לעסקים שצריכים בהירות בתזרים וברווחיות - מסביר את הערך מהר, בונה אמון, ומוביל לתיאום שיחת אפיון עסקית.",
    tags: ["דף נחיתה", "פיננסים", "עסקים"],
    href: "https://business.meirdahanfinance.co.il/",
    mockupClass: "mockup--landing",
    imageSrc: "/projects/finunit-business.webp",
    imageWidth: 1600,
    imageHeight: 906,
  },
  {
    id: "savyon-travel",
    title: "Savyon Travel",
    type: "אתר תדמית / תיירות",
    description:
      "אתר חווייתי לטיולים בעולם - סקי, מחלקת VIP ושירותי קרקע, עם מסר חזק שמזמין להתחיל את המסע ולהשאיר פנייה.",
    tags: ["תיירות", "אתר תדמית", "לידים"],
    href: "https://savyon-travel.vercel.app/",
    mockupClass: "mockup--landing",
    imageSrc: "/projects/savyon.webp",
    imageWidth: 1600,
    imageHeight: 907,
  },
];
