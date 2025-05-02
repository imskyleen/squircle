# Squircle with Tailwind CSS

A simple and flexible way to make Squircles with Tailwind CSS.

## Installation

```bash
npm install @squircle/core @squircle/paint-polyfill @squircle/tailwindcss
```

## Import

```ts
import { init } from '@squircle/core';
```

## Initialize

```ts
init();
```

## Initialize in React

```tsx title="squircle-provider.tsx"
'use client';

import * as React from 'react';
import { init } from '@squircle/core';

export function SquircleProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => void init(), []);
  return children;
}
```

Then use the `SquircleProvider` component to wrap your app.

```tsx
<SquircleProvider>
  <App />
</SquircleProvider>
```

## Usage

**Only support Tailwind >= 4.0.**

### Import

```css title="globals.css"
@import '@squircle/tailwindcss';
```

### Use

```html
<div class="squircle squircle-2xl squircle-teal-400" />
```

## Beta phase

Squircle is in beta phase, so there may be bugs and optimization issues for browsers not compatible with `CSS.paintWorklet`.

## Limitations

While Squircle is designed to work seamlessly across all modern browsers, there are a few limitations to keep in mind:

- Squircle uses a custom polyfill, `@squircle/paint-polyfill`, a heavily improved fork of `css-paint-polyfill`.
  This polyfill brings CSS Houdini compatibility to browsers that do not support `CSS.paintWorklet` natively.

- However, **very old browsers**, such as **Internet Explorer** and **some early versions of Edge**, are not supported. These browsers do not support the necessary underlying APIs to run the polyfill reliably.
  _(Note: Internet Explorer is not officially tested and should be considered unsupported.)_

- In browsers without native CSS Houdini support (thus relying on `@squircle/paint-polyfill`), there may be **minor performance overhead**.
  This is because the polyfill **actively listens** to style changes and dynamically **replaces paint operations** in the DOM, which can slightly impact performance, especially in large or highly dynamic applications.

⚠ Additionally, when using animation libraries such as [Motion](https://motion.dev/) in browsers that do not support `CSS.paintWorklet` (**Firefox** and **Safari**), performance issues may become more noticeable.
Since the polyfill relies on a MutationObserver to detect and respond to style changes, animations that rapidly and repeatedly update styles can trigger frequent DOM updates, potentially resulting in less smooth animations.
We are currently exploring solutions to mitigate this impact.

## Issues

If you encounter any problems, do not hesitate to [open an issue](https://github.com/imskyleen/squircle/issues) or [make a PR here](https://github.com/imskyleen/squircle).

## LICENSE

MIT
