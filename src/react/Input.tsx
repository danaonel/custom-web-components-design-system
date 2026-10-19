import {
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from "react";

import { registerComponents } from "../core/register";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  label?: string;
  help?: string;
  validation?: "valid" | "invalid";
  value?: string;
  onChange?: (value: string) => void;
};

export function Input({
  label,
  help,
  validation,
  placeholder,
  type = "text",
  disabled,
  required,
  value,
  onChange,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerComponents();

    const element = ref.current;
    if (!element) return;

    const handleInput = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      onChange?.(customEvent.detail);
    };

    element.addEventListener("app-input", handleInput);

    return () => {
      element.removeEventListener("app-input", handleInput);
    };
  }, [onChange]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (value !== undefined) {
      (element as HTMLElement & { value: string }).value = value;
    }
  }, [value]);

  return (
    <app-input
      ref={ref as React.Ref<HTMLElement>}
      label={label}
      help={help}
      validation={validation}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      required={required}
      {...rest}
    />
  );
}