"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  requiredMark?: boolean;
  error?: boolean;
};

type FloatingTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  requiredMark?: boolean;
  error?: boolean;
};

function FloatingLabel({
  htmlFor,
  label,
  requiredMark,
  floated,
}: {
  htmlFor: string;
  label: string;
  requiredMark?: boolean;
  floated: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "pointer-events-none absolute start-4 top-1/2 z-[1] origin-top-right -translate-y-1/2 text-sm text-slate-500 transition-all duration-200",
        floated &&
          "top-0 start-3 -translate-y-1/2 bg-white px-1 text-xs font-medium text-sky-700",
      )}
    >
      {label}
      {requiredMark ? (
        <span className="form-label__required ms-0.5" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  function FloatingInput(
    {
      label,
      className,
      requiredMark,
      error,
      id,
      onFocus,
      onBlur,
      onChange,
      value,
      defaultValue,
      placeholder = " ",
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      () =>
        (typeof value === "string" && value !== "") ||
        (typeof defaultValue === "string" && defaultValue !== "") ||
        (typeof value === "number" && !Number.isNaN(value)) ||
        (typeof defaultValue === "number" && !Number.isNaN(defaultValue)),
    );

    useEffect(() => {
      if (value === undefined) return;
      setHasValue(String(value) !== "");
    }, [value]);

    const floated = focused || hasValue;

    return (
      <div className={cn("floating-field", error && "floating-field--error")} dir="rtl">
        <input
          {...props}
          ref={ref}
          id={inputId}
          dir={props.type === "tel" || props.type === "email" ? "ltr" : "rtl"}
          className={cn(
            "peer form-input floating-field__control",
            (props.type === "tel" || props.type === "email") && "floating-field__control--ltr",
            error && "border-red-500",
            className,
          )}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            setHasValue(event.target.value !== "");
            onBlur?.(event);
          }}
          onChange={(event) => {
            setHasValue(event.target.value !== "");
            onChange?.(event);
          }}
        />
        <FloatingLabel
          htmlFor={inputId}
          label={label}
          requiredMark={requiredMark}
          floated={floated}
        />
      </div>
    );
  },
);

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  function FloatingTextarea(
    {
      label,
      className,
      requiredMark,
      error,
      id,
      onFocus,
      onBlur,
      onChange,
      value,
      defaultValue,
      placeholder = " ",
      rows = 3,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      () =>
        (typeof value === "string" && value !== "") ||
        (typeof defaultValue === "string" && defaultValue !== ""),
    );

    useEffect(() => {
      if (value === undefined) return;
      setHasValue(String(value) !== "");
    }, [value]);

    const floated = focused || hasValue;

    return (
      <div
        className={cn("floating-field floating-field--textarea", error && "floating-field--error")}
        dir="rtl"
      >
        <textarea
          {...props}
          ref={ref}
          id={inputId}
          rows={rows}
          dir="rtl"
          className={cn(
            "peer form-input floating-field__control",
            error && "border-red-500",
            className,
          )}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            setHasValue(event.target.value !== "");
            onBlur?.(event);
          }}
          onChange={(event) => {
            setHasValue(event.target.value !== "");
            onChange?.(event);
          }}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute start-4 top-3 z-[1] origin-top-right text-sm text-slate-500 transition-all duration-200",
            floated &&
              "top-0 start-3 -translate-y-1/2 bg-white px-1 text-xs font-medium text-sky-700",
          )}
        >
          {label}
          {requiredMark ? (
            <span className="form-label__required ms-0.5" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      </div>
    );
  },
);
