import CtaButton from "@/components/ui/CtaButton";

type StudioTextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ctaLocation?: string;
};

export default function StudioTextLink({
  href,
  children,
  className = "",
  ctaLocation = "studio-text-link",
}: StudioTextLinkProps) {
  return (
    <CtaButton href={href} ctaLocation={ctaLocation} className={className}>
      {children}
    </CtaButton>
  );
}
