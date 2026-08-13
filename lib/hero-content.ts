export const heroBlobs = [
  {
    className: "absolute top-[8%] right-[4%] w-[22rem] h-[22rem] max-w-[50vw] rounded-full",
    style: { backgroundColor: "rgba(91,33,182,0.34)", filter: "blur(42px)" },
  },
  {
    className: "absolute bottom-[10%] left-[2%] w-[28rem] h-[28rem] max-w-[55vw] rounded-full",
    style: { backgroundColor: "rgba(16,179,231,0.3)", filter: "blur(46px)" },
  },
  {
    className: "absolute top-[32%] left-[-4%] w-[18rem] h-[18rem] max-w-[42vw] rounded-full",
    style: { backgroundColor: "rgba(79,70,229,0.28)", filter: "blur(38px)" },
  },
  {
    className: "absolute bottom-[36%] right-[2%] w-80 h-80 max-w-[44vw] rounded-full",
    style: { backgroundColor: "rgba(129,140,248,0.28)", filter: "blur(40px)" },
  },
] as const;

export const heroCopy = {
  h1Line1: "כל מה שהעסק צריך",
  h1Line2: "מחובר למערכת אחת",
  subline:
    "בונים לכם אתר או דף נחיתה, מיתוג, קמפיינים, מדידה, CRM ואוטומציות - כדי שתדעו בדיוק מאיפה כל ליד הגיע, מי מחכה לחזרה ומה באמת עובד.",
  sublineMobile:
    "אתר, מיתוג, קמפיינים, מדידה, וואטסאפ ו-CRM במעטפת אחת - כדי שכל פנייה תיכנס מסודר, ולא תלך לאיבוד בדרך.",
  ctaLabel: "בואו נתחיל!",
  trustLine: "אתרים · דפי נחיתה · קמפיינים · CRM · וואטסאפ · אוטומציות · מדידה",
  pills: ["אתרים", "דפי נחיתה", "קמפיינים", "CRM", "אוטומציות"] as const,
} as const;
