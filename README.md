# @danielaglint/custom-web-components

A TypeScript-based Web Components library with React wrapper components, providing reusable UI elements that work seamlessly in both vanilla JavaScript and React applications.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40danielaglint%2Fcustom-web-components.svg)](https://www.npmjs.com/package/@danielaglint/custom-web-components)

## ✨ Features

- 🎨 **Native Web Components** - Built with standard Web Components APIs (Custom Elements, Shadow DOM)
- ⚛️ **React Wrappers** - First-class React support with TypeScript types
- 📦 **Tree-shakeable** - ES modules with multiple entry points for optimal bundle size
- 🔒 **Type-safe** - Full TypeScript support with declaration files
- 🎯 **Zero Dependencies** - Core components have no runtime dependencies
- ♿ **Accessible** - Built with accessibility in mind using semantic HTML
- 🚀 **Lightweight** - Minimal footprint with efficient rendering

## 📋 Table of Contents

- [Installation](#installation)
- [Components](#components)
  - [AppInput](#appinput)
  - [AppCounter](#appcounter)
- [Usage](#usage)
  - [Vanilla JavaScript / HTML](#vanilla-javascript--html)
  - [React](#react)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)
- [Development](#development)
- [Browser Support](#browser-support)
- [License](#license)

## 📦 Installation

```bash
npm install @danielaglint/custom-web-components
```

Or with yarn:

```bash
yarn add @danielaglint/custom-web-components
```

Or with pnpm:

```bash
pnpm add @danielaglint/custom-web-components
```

## 🧩 Components

### AppInput

A fully-featured input field with label, help text, and validation states. Perfect for forms and user input scenarios.

**Features:**
- Customizable label and placeholder
- Help text display
- Validation states (valid/invalid) with visual feedback
- Disabled and required states
- Custom event emission for seamless integration
- Programmatic focus control
- Shadow DOM encapsulation for style isolation

### AppCounter

An animated counter that increments to a target value with smooth transitions.

**Features:**
- Configurable target value
- Auto-start on mount
- Automatic cleanup on unmount
- Smooth counting animation (1 second intervals)
- Lifecycle management with proper cleanup

## 🚀 Usage

### Vanilla JavaScript / HTML

#### Option 1: Auto-register components

The simplest way to use the components - they're automatically registered when you import:

```javascript
import "@danielaglint/custom-web-components/register";
```

Then use them in your HTML:

```html
<app-input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  help="We'll never share your email"
  required>
</app-input>

<app-counter until="100"></app-counter>
```

#### Option 2: Manual registration

For more control over when components are registered:

```javascript
import { registerComponents, AppInputElement, AppCounterElement } from "@danielaglint/custom-web-components";

// Register all components at once
registerComponents();

// Or register individually
customElements.define("app-input", AppInputElement);
customElements.define("app-counter", AppCounterElement);
```

#### Listening to events

```javascript
const input = document.querySelector('app-input');

input.addEventListener('app-input', (event) => {
  console.log('Input value changed:', event.detail);
});

// Programmatically set value
input.value = 'hello@example.com';

// Programmatically focus
input.focus();
```

### React

React components provide a familiar API with full TypeScript support:

```tsx
import { useState } from "react";
import { Input, AppCounter } from "@danielaglint/custom-web-components/react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div>
      <h1>Contact Form</h1>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          help="We'll never share your email"
          validation={email.includes("@") ? "valid" : "invalid"}
          value={email}
          onChange={setEmail}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          help="Must be at least 8 characters"
          validation={password.length >= 8 ? "valid" : "invalid"}
          value={password}
          onChange={setPassword}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <h2>Visitors this month</h2>
      <AppCounter until={1250} />
    </div>
  );
}
```

## 📖 API Reference

### AppInput

#### Attributes (Web Component)

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `string` | `""` | Label text displayed above input |
| `placeholder` | `string` | `""` | Placeholder text |
| `type` | `string` | `"text"` | Input type (text, email, password, number, etc.) |
| `help` | `string` | `""` | Help text displayed below input |
| `validation` | `"valid"` \| `"invalid"` | - | Validation state (adds visual styling) |
| `disabled` | `boolean` | `false` | Disables the input |
| `required` | `boolean` | `false` | Marks input as required |
| `value` | `string` | `""` | Input value |

#### Props (React)

```typescript
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  placeholder?: string;
  type?: string;
  help?: string;
  validation?: "valid" | "invalid";
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}
```

#### Events

**`app-input`** - Fired when input value changes

```typescript
interface AppInputEvent extends CustomEvent {
  detail: string; // The new input value
}
```

```javascript
input.addEventListener('app-input', (event) => {
  console.log('New value:', event.detail);
});
```

#### Methods

- **`focus()`** - Programmatically focus the input
- **`value`** (getter/setter) - Get or set the input value

```javascript
const input = document.querySelector('app-input');
input.focus();
input.value = 'new value';
console.log(input.value);
```

#### CSS Parts

For advanced styling, expose shadow DOM parts:

```css
app-input::part(label) {
  font-weight: bold;
  color: #333;
}

app-input::part(input) {
  border-radius: 8px;
}

app-input::part(help) {
  font-style: italic;
}
```

### AppCounter

#### Attributes (Web Component)

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `until` | `number` | `10` | Target count value |

#### Props (React)

```typescript
interface AppCounterProps {
  until?: number; // Default: 10
}
```

#### CSS Parts

```css
app-counter::part(value) {
  font-size: 2rem;
  font-weight: bold;
  color: #0066cc;
}
```

## 🔧 TypeScript Support

The package includes full TypeScript definitions for both vanilla and React usage.

### Importing Types

```typescript
// Core components
import type { AppInputElement, AppCounterElement } from "@danielaglint/custom-web-components";

// React components
import type { InputProps, AppCounterProps } from "@danielaglint/custom-web-components/react";
```

### JSX Type Augmentation

For TypeScript projects using the web components directly in JSX/TSX:

```tsx
// These custom elements are automatically typed in React JSX
function MyComponent() {
  return (
    <>
      <app-input label="Name" type="text" />
      <app-counter until={50} />
    </>
  );
}
```

The package includes module augmentation for React's `JSX.IntrinsicElements`, providing full autocomplete and type checking.

## 📤 Package Exports

The package provides multiple entry points for optimal tree-shaking:

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./register": {
    "import": "./dist/register.js"
  },
  "./react": {
    "types": "./dist/react.d.ts",
    "import": "./dist/react.js"
  }
}
```

**Entry points:**
- `@danielaglint/custom-web-components` - Core components and registration function
- `@danielaglint/custom-web-components/register` - Auto-registration (side-effect import)
- `@danielaglint/custom-web-components/react` - React wrapper components

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 9+ (or yarn/pnpm equivalent)

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/danaonel/custom-web-components-design-system.git
cd custom-web-components-design-system
npm install
```

### Build

Build the library for production:

```bash
npm run build
```

**Build process:**
1. Cleans the `dist` folder (`npm run clean`)
2. Generates JavaScript bundles with Vite (`npm run build:bundle`)
3. Generates TypeScript declaration files (`npm run build:types`)

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

### Local Testing

#### Option 1: npm pack (Production-like testing)

```bash
# Build the package
npm run build

# Create a tarball
npm pack

# In your test project
npm install /path/to/danielaglint-custom-web-components-1.0.0.tgz
```

#### Option 2: npm link (Active development)

```bash
# In this package directory
npm link

# In your test project
npm link @danielaglint/custom-web-components

# Changes are reflected immediately after rebuild
npm run build
```

### Project Structure

```
custom-web-components/
├── src/
│   ├── core/                   # Core web components
│   │   ├── counter.ts          # AppCounter web component
│   │   ├── input.ts            # AppInput web component
│   │   ├── register.ts         # Component registration function
│   │   └── register-auto.ts    # Auto-registration entry
│   ├── react/                  # React wrapper components
│   │   ├── AppCounter.tsx      # React wrapper for counter
│   │   ├── Input.tsx           # React wrapper for input
│   │   └── index.ts            # React exports
│   ├── custom-elements.d.ts    # JSX type augmentation
│   └── index.ts                # Main exports
├── dist/                       # Build output (generated)
├── .github/
│   └── workflows/              # CI/CD workflows
│       ├── release.yml         # Automated releases
│       └── storybook.yml       # Storybook deployment
├── package.json
├── tsconfig.json               # TypeScript configuration
├── vite.config.js              # Vite build configuration
└── README.md
```

## 🌐 Browser Support

This library requires browsers with native Web Components support:

- ✅ Chrome/Edge 67+
- ✅ Firefox 63+
- ✅ Safari 13.1+
- ✅ Opera 54+

### Polyfills for Older Browsers

For older browser support, use the Web Components polyfills:

```bash
npm install @webcomponents/webcomponentsjs
```

```javascript
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@danielaglint/custom-web-components/register';
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Daniela Glint](https://github.com/danaonel)

See [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/danaonel/custom-web-components-design-system)
- [npm Package](https://www.npmjs.com/package/@danielaglint/custom-web-components)
- [Report Issues](https://github.com/danaonel/custom-web-components-design-system/issues)

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes and version history.

---

**Made with ❤️ by Daniela Glint**