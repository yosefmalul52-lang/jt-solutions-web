export type ButtonVariant =
  | "primary"
  | "gradient"
  | "secondary"
  | "soft"
  | "whatsapp"
  | "ghost";

export type ButtonSize = "md" | "sm";

export type ButtonShine = boolean | "auto";

export type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  shine?: ButtonShine;
  className?: string;
};

const SHINE_VARIANTS: ButtonVariant[] = ["primary", "gradient", "whatsapp"];

export function shouldShowShine(
  variant: ButtonVariant,
  shine: ButtonShine | undefined,
  disabled?: boolean,
  loading?: boolean,
): { show: boolean; auto: boolean } {
  if (disabled || loading) return { show: false, auto: false };
  if (shine === false) return { show: false, auto: false };
  if (shine === "auto") return { show: true, auto: true };
  if (shine === true) return { show: true, auto: false };
  if (shine === undefined && SHINE_VARIANTS.includes(variant)) {
    return { show: true, auto: false };
  }
  return { show: false, auto: false };
}

export function getButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  disabled,
  shine,
  className = "",
}: ButtonClassOptions): string {
  const { show, auto } = shouldShowShine(variant, shine, disabled, loading);

  return [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading ? "btn--loading" : "",
    disabled ? "btn--disabled" : "",
    show ? (auto ? "btn--shine-auto" : "btn--shine") : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
