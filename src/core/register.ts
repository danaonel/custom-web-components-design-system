import { AppInputElement } from "./input";
import { AppCounterElement } from "./counter";

export function registerComponents() {
  if (!customElements.get("app-input")) {
    customElements.define("app-input", AppInputElement);
  }

  if (!customElements.get("app-counter")) {
    customElements.define("app-counter", AppCounterElement);
  }
}

registerComponents();