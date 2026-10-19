export class AppCounterElement extends HTMLElement {
  private count = 0;
  private intervalId?: ReturnType<typeof setInterval>;
  private output?: HTMLSpanElement;

  static get observedAttributes() {
    return ["until"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: Arial, sans-serif;
        }
      </style>
      <span part="value">0</span>
    `;

    shadow.appendChild(template.content.cloneNode(true));
    this.output = shadow.querySelector("span")!;
  }

  connectedCallback() {
    this.render();
    this.start();
  }

  disconnectedCallback() {
    this.stop();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.stop();
      this.start();
    }
  }

  private render() {
    if (this.output) {
      this.output.textContent = String(this.count);
    }
  }

  private start() {
    this.stop();

    const until = Number(this.getAttribute("until") ?? 10);

    if (!Number.isFinite(until)) return;

    if (this.count >= until) return;

    this.intervalId = setInterval(() => {
      this.count = Math.min(this.count + 1, until);
      this.render();

      if (this.count >= until) {
        this.stop();
      }
    }, 1000);
  }

  private stop() {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}