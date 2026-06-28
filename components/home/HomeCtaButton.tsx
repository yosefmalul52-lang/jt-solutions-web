import CtaButton, { type CtaButtonProps } from "@/components/ui/CtaButton";

/** Homepage hero CTA — gradient variant with auto shine. */
export default function HomeCtaButton({
  variant = "gradient",
  shine = "auto",
  ...props
}: CtaButtonProps) {
  return <CtaButton variant={variant} shine={shine} {...props} />;
}
