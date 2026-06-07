export const heroTrustItems = [
  { text: "מענה אישי תוך 24 שעות" },
  { text: "ליווי ישיר 1:1" },
  { text: "תהליך ברור מהיום הראשון" },
] as const;

/** Placeholder trust logos — swap for client SVGs when available */
export const heroTrustLogos = [
  { id: "magadim", label: "Magadim" },
  { id: "eb-hair", label: "EB Hair" },
  { id: "n8n", label: "n8n" },
  { id: "nextjs", label: "Next.js" },
  { id: "vercel", label: "Vercel" },
] as const;

export const heroBlobs = [
  {
    className: "absolute top-[8%] right-[4%] w-[22rem] h-[22rem] max-w-[50vw] rounded-full",
    style: { backgroundColor: "rgba(109,40,217,0.42)", filter: "blur(64px)" },
  },
  {
    className: "absolute bottom-[10%] left-[2%] w-[28rem] h-[28rem] max-w-[55vw] rounded-full",
    style: { backgroundColor: "rgba(59,130,246,0.35)", filter: "blur(72px)" },
  },
  {
    className: "absolute top-[32%] left-[-4%] w-[18rem] h-[18rem] max-w-[42vw] rounded-full",
    style: { backgroundColor: "rgba(99,102,241,0.38)", filter: "blur(56px)" },
  },
  {
    className: "absolute bottom-[36%] right-[2%] w-80 h-80 max-w-[44vw] rounded-full",
    style: { backgroundColor: "rgba(129,140,248,0.32)", filter: "blur(60px)" },
  },
] as const;

export const heroCopy = {
  h1Line1: "מעטפת מקצה לקצה –",
  h1Line2: "ממיתוג פרימיום ועד לתשתית לידים חכמה.",
  subline:
    "בונים עבורך אתרים ממירים, דפי נחיתה, חנויות איקומרס, מיתוג ואוטומציה — אפיון חכם, עיצוב מקצועי ותהליך ברור שמחבר הכל לפניות אמיתיות.",
  story:
    "מתחילים באפיון ממוקד — מגדירים יחד מטרות, קהל ומסר. בונים את הנכסים: אתר, מיתוג, אוטומציה. מחברים מדידה, פרסום וליווי שוטף — כדי שכל מבקר וכל שקל בפרסום מתורגמים לפנייה איכותית, לא לעוד תבנית שלא ממירה.",
  ctaLabel: "אני רוצה אבחון לעסק שלי",
  microcopy: "בשיחת התאמה של כ-15 דקות תקבלו החלטה ברורה מה הצעד הבא לעסק שלכם.",
} as const;
