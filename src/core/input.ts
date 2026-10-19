const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    label {
      display: block;
      margin-bottom: 6px;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      min-width: 200px;
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 3px;
      font: inherit;
    }

    .help {
      display: block;
      margin-top: 4px;
      font-size: 0.8rem;
    }

    :host([validation="invalid"]) input {
      border-color: red;
    }

    :host([validation="invalid"]) .help {
      color: red;
    }

    :host([validation="valid"]) input {
      border-color: green;
    }

    :host([validation="valid"]) .help {
      color: green;
    }
  </style>

  <label part="label"></label>
  <input part="input" />
  <span class="help" part="help"></span>
`;

export class AppInputElement extends HTMLElement {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private helpElement: HTMLSpanElement;

  static get observedAttributes() {
    return [
      "label",
      "placeholder",
      "type",
      "help",
      "validation",
      "disabled",
      "required",
      "value",
    ];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    this.input = shadow.querySelector("input")!;
    this.label = shadow.querySelector("label")!;
    this.helpElement = shadow.querySelector(".help")!;

    if (!this.input || !this.label || !this.helpElement) {
      console.error("AppInputElement: Failed to initialize shadow DOM elements");
      return;
    }

    this.input.addEventListener("input", () => {
      this.dispatchEvent(
        new CustomEvent<string>("app-input", {
          detail: this.input.value,
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  private update() {
    if (!this.input || !this.label || !this.helpElement) return;

    this.label.textContent = this.getAttribute("label") ?? "";
    this.input.placeholder =
      this.getAttribute("placeholder") ?? "";
    this.input.type = this.getAttribute("type") ?? "text";
    this.input.disabled = this.hasAttribute("disabled");
    this.input.required = this.hasAttribute("required");

    this.helpElement.textContent = this.getAttribute("help") ?? "";

    const value = this.getAttribute("value");
    if (value !== null && this.input.value !== value) {
      this.input.value = value;
    }
  }

  get value() {
    return this.input.value;
  }

  set value(value: string) {
    this.input.value = value;
  }

  focus() {
    this.input.focus();
  }
}