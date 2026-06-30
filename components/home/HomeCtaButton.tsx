import CtaButton, { type CtaButtonProps } from "@/components/ui/CtaButton";

/** Homepage hero CTA — enterprise primary + restrained stripe. */
export default function HomeCtaButton({
  variant = "primary",
  shine = "auto",
  hideIcon = false,
  ...props
}: CtaButtonProps) {
  return <CtaButton variant={variant} shine={shine} hideIcon={hideIcon} {...props} />;
}
