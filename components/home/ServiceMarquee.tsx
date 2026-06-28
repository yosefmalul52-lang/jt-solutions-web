const trustItems = [
  "אתרים",
  "דפי נחיתה",
  "CRM",
  "אוטומציות",
  "מדידה",
  "וואטסאפ",
] as const;

export default function ServiceMarquee() {
  return (
    <div className="home-trust-strip flex flex-wrap items-center justify-center gap-2" dir="rtl">
      {trustItems.map((item) => (
        <span className="home-trust-pill" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
