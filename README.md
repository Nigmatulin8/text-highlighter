# Text Highlighter

[![npm](https://img.shields.io/npm/v/@nigmatulin8/text-highlighter-core)](https://www.npmjs.com/package/@nigmatulin8/text-highlighter-core)
[![license](https://img.shields.io/npm/l/@nigmatulin8/text-highlighter-core)](LICENSE)

A lightweight text highlighting library for HTML content with a framework-agnostic core and framework-specific adapters.

The project is built around a small, reusable core that processes HTML strings and highlights matching text while preserving the existing HTML structure.

> [!WARNING]
> The library does not sanitize HTML. When working with user-provided or untrusted HTML, sanitize the content before passing it to the library.

## Packages

| Package | Description |
| --- | --- |
| [`@nigmatulin8/text-highlighter-core`](https://www.npmjs.com/package/@nigmatulin8/text-highlighter-core) | Framework-agnostic core |
| [`@nigmatulin8/text-highlighter-vue2`](https://www.npmjs.com/package/@nigmatulin8/text-highlighter-vue2) | Vue 2 component |
| [`@nigmatulin8/text-highlighter-vue3`](https://www.npmjs.com/package/@nigmatulin8/text-highlighter-vue3) | Vue 3 component |
| [`@nigmatulin8/text-highlighter-react`](https://www.npmjs.com/package/@nigmatulin8/text-highlighter-react) | React component |

## Features

* Highlight text inside HTML content
* Preserve the existing HTML structure
* Case-sensitive or case-insensitive matching
* Highlight the first match or all matches
* Custom highlight tag
* Custom CSS class
* Exclude specific HTML tags from highlighting
* Framework-agnostic core
* TypeScript support

## Installation

```bash
pnpm add @nigmatulin8/text-highlighter-core
```

## Quick Example

```ts
import { highlightHtml } from '@nigmatulin8/text-highlighter-core';

const html = '<p>Hello <strong>world</strong></p>';
const result = highlightHtml(html, 'world');

console.log(result);
```

Output:

```html
<p>Hello <strong><span class="highlighted">world</span></strong></p>
```

## Options

Options are passed as the third argument:

```ts
highlightHtml(html, 'world', {
  caseSensitive: true,
  all: false,
  tag: 'mark',
  className: 'match',
  excludeTags: ['code', 'pre'],
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `caseSensitive` | `boolean` | `false` | Match text with respect to case |
| `all` | `boolean` | `true` | Highlight all matches (`false` — only the first one) |
| `tag` | `string` | `'span'` | HTML tag used to wrap matches |
| `className` | `string` | `'highlighted'` | CSS class added to the wrapping tag |
| `excludeTags` | `string[]` | `[]` | Tags whose content is never highlighted |

## Framework Adapters

### Vue 2

```bash
pnpm add @nigmatulin8/text-highlighter-vue2
```

See [`packages/vue2/README.md`](packages/vue2/README.md).

### Vue 3

```bash
pnpm add @nigmatulin8/text-highlighter-vue3
```

See [`packages/vue3/README.md`](packages/vue3/README.md).

### React

```bash
pnpm add @nigmatulin8/text-highlighter-react
```

See [`packages/react/README.md`](packages/react/README.md).

## Development

This repository is a pnpm monorepo.

```bash
# Install dependencies
pnpm install

# Run tests for all packages
pnpm -r test --run

# Build all packages
pnpm -r build
```

## Repository Structure

```text
packages/
├── core/       # Framework-agnostic core
├── vue2/       # Vue 2 adapter
├── vue3/       # Vue 3 adapter
└── react/      # React adapter
```

## Security

The library does not sanitize HTML. Always sanitize untrusted or user-provided HTML before passing it to the library.

## License

[MIT](LICENSE)
