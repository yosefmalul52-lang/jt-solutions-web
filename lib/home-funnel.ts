export const identificationSection = {
  headline: "אם זה נשמע מוּכָּר.. — האתר שלך צריך לעבוד אחרת!",
  cards: [
    {
      pain: "יש לך עסק טוב, אבל האתר לא משדר את הרמה שלך!",
      solution: "נבנה מסר, מבנה ועיצוב שמציגים את העסק נכון.",
    },
    {
      pain: "אתה מקבל פניות, אבל הן הולכות לאיבוד בוואטסאפ!",
      solution: "מחברים את הפניות למעקב מסודר.",
    },
    {
      pain: "אתה רוצה להתחיל לפרסם, אבל אין לך דף נחיתה ומדידה?",
      solution: "בונים דף נחיתה ותשתית מדידה לפני שמעלים קמפיין.",
    },
    {
      pain: "אתה לא באמת יודע איזה פרסום מביא לקוחות?",
      solution: "מודדים קמפיינים, מקורות פנייה ומה באמת מביא לקוחות.",
    },
    {
      pain: "אתה לא רוצה לרדוף אחרי כמה ספקים?",
      solution: "מחברים אתר, קמפיינים, CRM ואוטומציות במקום אחד.",
    },
  ],
} as const;

export const problemSection = {
  headline: "רוב העסקים לא נופלים בגלל שאין להם אתר",
  headlineSecondary: "הם נופלים בנקודות החיבור",
  subline:
    "כשקמפיין, אתר, טופס, וואטסאפ ומעקב לא עובדים יחד — קשה לדעת מאיפה מגיעות פניות ומה באמת צריך לשפר.",
  insight:
    "הבעיה לרוב לא נמצאת רק באתר או רק בקמפיין — אלא בחיבור ביניהם!!",
  journeyClosing: "כשהחיבור בין כל השלבים ברור — כל פנייה מגיעה למקום הנכון ומקבלת המשך.",
  journeySteps: [
    {
      id: "campaign",
      index: "01",
      label: "קמפיין",
      description: "מישהו רואה את הפרסום שלך ולוחץ — ונכנס לאתר או לדף נחיתה.",
      micro: "זה השלב שבו נכנסת תנועה. בלי פרסום ממוקד, פחות אנשים מגיעים בכלל לראות מה אתה מציע.",
      color: "#F59E0B",
      side: "right",
    },
    {
      id: "site",
      index: "02",
      label: "אתר / דף נחיתה",
      description: "הגולש מגיע לדף עם מסר ברור, כפתור פעולה וטופס להשארת פרטים.",
      micro: "כאן הוא מחליט אם לפנות. אם המסר מבולגן, אין כפתור ברור או שהדף איטי — הוא פשוט עוזב.",
      color: "#2563EB",
      side: "left",
    },
    {
      id: "lead",
      index: "03",
      label: "ליד",
      description: "הגולש משאיר שם, טלפון או פרטים — נוצרת פנייה חדשה.",
      micro: "עד כאן הכול נראה טוב. אבל הפנייה עדיין לא בטיפול — היא רק נרשמה איפשהו.",
      color: "#10B981",
      side: "right",
    },
    {
      id: "break",
      index: "04",
      label: "נקודת נתק",
      description: "הפנייה נשארת בוואטסאפ, באימייל או בטופס — בלי שמישהו עוקב אחריה.",
      micro: "כאן הרבה עסקים מאבדים לקוחות: אין סדר, אין תזכורת, ואף אחד לא יודע מי כבר קיבל מענה.",
      color: "#EF4444",
      side: "left",
      isBreak: true,
    },
    {
      id: "crm",
      index: "05",
      label: "וואטסאפ / CRM",
      description: "כל פנייה נכנסת למקום אחד — רשימה, גיליון או מערכת שמארגנת את הלקוחות.",
      micro: "במקום לחפש בהודעות ישנות, רואים מי פנה, מתי, ומאיזה מקור הוא הגיע.",
      color: "#7C3AED",
      side: "right",
      repair: true,
    },
    {
      id: "track",
      index: "06",
      label: "מעקב",
      description: "יודעים מי צריך חזרה, שולחים תזכורת וממשיכים את השיחה בזמן.",
      micro: "פנייה שלא חוזרים אליה תוך יום-יומיים — לרוב הולכת לאיבוד, גם אם הייתה מעוניינת.",
      color: "#06B6D4",
      side: "left",
      repair: true,
    },
    {
      id: "measure",
      index: "07",
      label: "מדידה",
      description: "רואים כמה פניות הגיעו, מאיזה קמפיין, ומה באמת הביא תוצאות.",
      micro: "בלי מדידה קשה לדעת מה לשפר — ואיפה כדאי להשקיע בפעם הבאה.",
      color: "#10B981",
      side: "right",
      repair: true,
    },
  ],
  funnel: {
    nodes: [
      { id: "campaign", label: "קמפיין", micro: "תנועה נכנסת", color: "#F59E0B" },
      { id: "site", label: "אתר", micro: "מסר ו־CTA", color: "#2563EB" },
      { id: "lead", label: "ליד", micro: "טופס פנייה", color: "#10B981" },
      { id: "crm", label: "וואטסאפ / CRM", micro: "קליטת ליד", color: "#7C3AED" },
      { id: "track", label: "מעקב", micro: "חזרה מסודרת", color: "#06B6D4" },
    ],
    break: {
      label: "נקודת נתק",
      micro: "כאן הרבה פניות הולכות לאיבוד",
    },
    fix: {
      label: "הפתרון",
      text: "מחברים קמפיין, אתר, ליד, CRM ומעקב למערכת אחת — כדי שכל פנייה תקבל המשך ברור.",
      note: "כשכל שלב מחובר, כל פנייה מקבלת המשך ברור.",
      steps: ["ליד", "CRM", "תזכורת חזרה", "מדידה"],
    },
  },
} as const;

export const solutionFlow = {
  headline: "מערכת אחת — מהתנועה ועד הסגירה",
  steps: [
    { label: "תנועה", hint: "פרסום, המלצות, חיפוש" },
    { label: "אתר / דף נחיתה", hint: "מסר ברור ופעולה" },
    { label: "פנייה", hint: "טופס, וואטסאפ או טלפון" },
    { label: "וואטסאפ / CRM", hint: "ליד במקום אחד" },
    { label: "מעקב", hint: "מי צריך חזרה ומתי" },
    { label: "סגירה", hint: "תהליך מכירה מסודר" },
  ],
} as const;

/** Maps each solution-flow step index to a system-map service index (null = center / closing). */
export const solutionFlowToServiceIndex = [1, 0, 2, 3, 6, null] as const;

export const systemMapSection = {
  headlineBefore: "מה אנחנו ",
  headlineAccent: "מחברים",
  headlineAfter: " לעסק שלך?",
  subline:
    "לא רק אתר — תשתית אחת שמחברת פרסום, נכס דיגיטלי, פנייה, CRM, אוטומציה ומדידה.",
  centerTitle: "העסק שלך",
  centerStatus: "מערכת אחת",
  bridgeLabel: "כל שלב במסלול מתחבר לכאן",
  services: [
    { label: "אתר / דף נחיתה", hint: "נכס שממיר מתעניין לפנייה", color: "#2563EB" },
    { label: "קמפיינים", hint: "תנועה שאפשר למדוד", color: "#F59E0B" },
    { label: "וואטסאפ", hint: "ערוץ פנייה מוכר", color: "#10B981" },
    { label: "CRM / Sheet", hint: "כל הלידים במקום אחד", color: "#7C3AED" },
    { label: "אוטומציות", hint: "פחות עבודה ידנית", color: "#4F46E5" },
    { label: "מדידה", hint: "יודעים מה עובד", color: "#06B6D4" },
    { label: "מעקב אחרי לידים", hint: "אף פנייה לא נשכחת", color: "#0EA5E9" },
  ],
} as const;

export const deliverablesSection = {
  headline: "מה מקבלים בפועל",
  subline: "לפי היקף הפרויקט — לא הכל בכל מסלול, אבל הכיוון תמיד אותו דבר: פניות מסודרות ומדידה.",
  items: [
    { title: "אפיון עסקי קצר", text: "מבינים מטרה, קהל ומה חוסם פניות לפני שמתחילים." },
    { title: "מסר וקופי בסיסי", text: "שפה שמדברת ללקוח שלך — לא ז'רגון טכני." },
    { title: "עיצוב מותאם מובייל", text: "רוב הפניות מגיעות מהטלפון — העיצוב בנוי לזה." },
    { title: "אתר או דף נחיתה", text: "נכס דיגיטלי שמוביל לפעולה ברורה, לפי הצורך." },
    { title: "טופס פנייה ברור", text: "פחות חיכוך — יותר סיכוי שהמתעניין ישאיר פרטים." },
    { title: "חיבור וואטסאפ", text: "מי שמעדיף לכתוב — מגיע אליך בערוץ שהוא מכיר." },
    {
      title: "מדידה של מקורות פנייה",
      text: "תדע מאיפה הגיעו הפניות ומה שווה להמשיך לפרסם.",
      detail: "כולל GA4 ו־Meta Pixel לפי צורך",
    },
    { title: "אירועי המרה", text: "מדידה של טופס, וואטסאפ וטלפון — לא רק צפיות." },
    {
      title: "CRM / Google Sheet לפי צורך",
      text: "רשימת לידים במקום אחד — לא מפוזרים בצ'אטים.",
    },
    { title: "הדרכה קצרה בסיום", text: "יוצאים עם מערכת שאפשר לתפעל, לא תלות קבועה." },
  ],
} as const;

export const processSteps = [
  {
    step: "01",
    title: "אבחון",
    text: "מבינים איפה העסק עומד, מה חוסם פניות ומה שווה לבנות קודם.",
  },
  {
    step: "02",
    title: "אפיון",
    text: "מגדירים מסר, זרימה ומערכת — לפני שמתחילים לבנות.",
  },
  {
    step: "03",
    title: "בנייה",
    text: "מעצבים, מפתחים ומחברים אתר, מדידה ואוטומציה כמערכת אחת.",
  },
  {
    step: "04",
    title: "מדידה ושיפור",
    text: "עולים לאוויר, מודדים ומשפרים לפי נתונים — לא לפי תחושות.",
  },
] as const;

export const homePathways = [
  {
    id: "digital-start",
    name: "התחלה דיגיטלית מסודרת",
    forWho: "אין אתר / אתר ישן — רוצים נכס ראשון שעובד",
    description: "דף נחיתה או אתר תדמית עם מסר ברור, טופס פנייה ומדידה בסיסית.",
    items: ["אפיון קצר", "אתר או דף נחיתה", "חיבור לטפסים ווואטסאפ"],
    ctaLocation: "pathway-digital-start",
    ctaHref: "/contact?service=landing",
  },
  {
    id: "ready-to-advertise",
    name: "אתר/דף נחיתה שמוכן לפרסום",
    forWho: "רוצים לפרסם בקרוב — צריך דף + מדידה",
    description: "נכס ממיר עם אירועי המרה, פיקסלים ותשתית שמאפשרת לדעת מה עובד.",
    items: ["דף או אתר ממוקד המרה", "מדידת מקורות פנייה", "אירועי המרה מוגדרים"],
    popular: true,
    ctaLocation: "pathway-advertise",
    ctaHref: "/contact?service=website",
  },
  {
    id: "leads-system",
    name: "מערכת לידים ואוטומציות לעסק בצמיחה",
    forWho: "נפח פניות גבוה — צריך CRM ואוטומציה",
    description: "חיבור מקורות לידים, התראות ומעקב — כדי שלא יאבד אף פנייה בדרך.",
    items: ["חיבור CRM או Google Sheet", "אוטומציות לפי צורך", "מעקב מסודר אחרי לידים"],
    ctaLocation: "pathway-leads",
    ctaHref: "/contact?service=automation",
  },
] as const;

export const finalCtaSection = {
  eyebrow: "CTA סופי",
  before: "נבדוק יחד מה ",
  accent: "חסר",
  after: " — ומה כדאי לבנות קודם",
  accentColor: "#2563EB",
  subline:
    "אבחון דיגיטלי קצר שמחבר בין העסק שלך, האתר, הקמפיינים, הפניות והמעקב — בלי התחייבות ובלי רעש.",
} as const;

export const finalCtaSteps = [
  {
    num: "1",
    title: "בודקים את העסק",
    text: "מבינים איפה אתם עומדים היום — אתר, תנועה ומסרים.",
  },
  {
    num: "2",
    title: "מזהים פערים",
    text: "מה מונע מפניות להגיע, להתקבל או להסתדר בצורה מסודרת.",
  },
  {
    num: "3",
    title: "מציעים כיוון",
    text: "מה כדאי לבנות קודם — בצעד אחד ברור וממוקד.",
  },
] as const;

export const finalCtaTrust = [
  "מענה אישי תוך 24 שעות",
  "בלי התחייבות או לחץ מכירה",
  "ליווי אחד מקצה לקצה",
] as const;

/** Homepage CTA — quick intent chips (maps to contact schema `service`) */
export const finalCtaServiceChips = [
  { label: "אין לי אתר / האתר ישן", color: "#2563EB" },
  { label: "אני צריך דף נחיתה לקמפיין", color: "#06B6D4" },
  { label: "אני רוצה יותר פניות", color: "#7C3AED" },
  { label: "אני לא בטוח — צריך הכוונה", color: "#10B981" },
] as const;

/** @deprecated Used by legacy HomeServices section — not on homepage */
export const homeServicePillars = [
  {
    title: "בניית אתרים ודפי נחיתה",
    outcome: "נכס דיגיטלי שממיר מתעניינות לפניות",
    href: "/services/websites",
    icon: "monitor" as const,
    accent: "sky" as const,
  },
  {
    title: "מיתוג וזהות",
    outcome: "מראה מקצועי שבונה אמון לפני השיחה",
    href: "/services/branding",
    icon: "palette" as const,
    accent: "violet" as const,
  },
  {
    title: "אוטומציה ומדידה",
    outcome: "לידים שמגיעים מסודר — בלי ליפול בין הכיסאות",
    href: "/services/automations",
    icon: "workflow" as const,
    accent: "cyan" as const,
  },
  {
    title: "שיווק דיגיטלי",
    outcome: "תשתית שמאפשרת לצמוח בצורה מדידה",
    href: "/services/digital-marketing",
    icon: "megaphone" as const,
    accent: "emerald" as const,
  },
] as const;
