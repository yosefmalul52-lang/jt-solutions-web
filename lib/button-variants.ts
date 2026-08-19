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

export function shouldShowShine(
  _variant: ButtonVariant,
  _shine: ButtonShine | undefined,
  _disabled?: boolean,
  _loading?: boolean,
): { show: boolean; auto: boolean } {
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
