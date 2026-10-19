import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "app-input": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        label?: string;
        help?: string;
        placeholder?: string;
        type?: string;
        validation?: "valid" | "invalid";
        disabled?: boolean;
        required?: boolean;
        value?: string;
      };

      "app-counter": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        until?: number;
      };
    }
  }
}

// declare module "@ps/web-components-package/react" {
//   // Optionally, declare actual exports for better type safety:
//   export const Input: React.ComponentType<any>;
//   export const AppCounter: React.ComponentType<any>;
//   // If you don't know the exports, use:
//   const value: any;
//   export = value;
// }