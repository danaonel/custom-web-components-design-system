import { useEffect } from "react";
import { registerComponents } from "../core/register";

export interface AppCounterProps {
  until?: number;
}

export function AppCounter({ until = 10 }: AppCounterProps) {
  useEffect(() => {
    registerComponents();
  }, []);

  return <app-counter until={until} />;
}