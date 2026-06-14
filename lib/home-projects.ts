export type HomeProjectCard = {
  id: string;
  name: string;
  type: string;
  resultLine: string;
  imageSrc: string;
  imageAlt: string;
};

export const homeProjectCards: HomeProjectCard[] = [
  {
    id: "magadim",
    name: "Magadim",
    type: "חנות איקומרס",
    resultLine: "חנות ותשתית ניהול שמרכזת הזמנות, מוצרים ותהליכים במקום אחד",
    imageSrc: "/projects/magadim.png",
    imageAlt: "תצוגת חנות איקומרס Magadim — דשבורד הזמנות וניהול",
  },
  {
    id: "eb-hair",
    name: "EB Hair",
    type: "מיתוג ודף נחיתה",
    resultLine: "דף נחיתה ומיתוג דיגיטלי שמייצרים תחושת יוקרה ופניות איכותיות יותר",
    imageSrc: "/projects/eb-hair.png",
    imageAlt: "דף נחיתה יוקרתי EB Hair — מיתוג וממשק ממיר",
  },
  {
    id: "ai-automation",
    name: "אוטומציה עסקית",
    type: "חיבור לידים ו-CRM",
    resultLine: "אוטומציית לידים שמחברת טפסים, התראות ו־CRM כדי שלא יאבד אף ליד",
    imageSrc: "/projects/ai-automation.png",
    imageAlt: "תהליך אוטומציה עסקית — חיבור לידים ו-CRM",
  },
];
