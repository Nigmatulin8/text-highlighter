# @nigmatulin8/text-highlighter-react

React component for highlighting text inside HTML content.

Built on top of [`@nigmatulin8/text-highlighter-core`](https://www.npmjs.com/package/@nigmatulin8/text-highlighter-core).

## Installation

```bash
pnpm add @nigmatulin8/text-highlighter-react
```

Or:

```bash
npm install @nigmatulin8/text-highlighter-react
```

## Usage

```tsx
import { TextHighlighter } from '@nigmatulin8/text-highlighter-react';

export default function App() {
  return (
    <TextHighlighter
      html="<p>Hello <strong>world</strong></p>"
      search="world"
    />
  );
}
```

The result:

```html
<div>
  <p>Hello <strong><span class="highlighted">world</span></strong></p>
</div>
```

## Props

### `html`

HTML string to process.

```tsx
<TextHighlighter
  html="<p>Hello <strong>world</strong></p>"
  search="world"
/>
```

Type: `string`
Default: `''`

### `search`

Text to highlight.

```tsx
<TextHighlighter
  html="<p>Hello world</p>"
  search="world"
/>
```

Type: `string`
Default: `''`

### `options`

Options passed directly to `@nigmatulin8/text-highlighter-core`.

```tsx
<TextHighlighter
  html="<p>Hello WORLD world</p>"
  search="world"
  options={{
    ignoreCase: true,
    highlightAll: true,
  }}
/>
```

Available options:

| Option         | Type       | Default                           | Description                                         |
| -------------- | ---------- | ---------------------------------- | --------------------------------------------------- |
| `ignoreCase`   | `boolean`  | `false`                            | Match text case-insensitively.                      |
| `highlightAll` | `boolean`  | `false`                            | Highlight all matches instead of the first match.   |
| `tag`          | `string`   | `'span'`                           | HTML tag used for highlighted text.                  |
| `className`    | `string`   | `'highlighted'`                    | CSS class added to highlighted elements.             |
| `excludedTags` | `string[]` | `['SCRIPT', 'STYLE', 'NOSCRIPT']`  | HTML tags whose contents should not be highlighted.  |

### `wrapperTag`

HTML tag used as the component wrapper.

```tsx
<TextHighlighter
  html="<p>Hello world</p>"
  search="world"
  wrapperTag="section"
/>
```

Default: `'div'`

### HTML attributes

HTML attributes can be passed directly to the wrapper element.

```tsx
<TextHighlighter
  html="<p>Hello world</p>"
  search="world"
  className="content"
  id="article"
  data-testid="highlighter"
/>
```

## Custom highlight styles

The highlighted text uses the `highlighted` class by default.

```css
.highlighted {
  background: yellow;
}
```

You can use a custom class:

```tsx
<TextHighlighter
  html="<p>Hello world</p>"
  search="world"
  options={{
    className: 'my-highlight',
  }}
/>
```

```css
.my-highlight {
  background: yellow;
  font-weight: 600;
}
```

## Security

This component renders the provided HTML using React's `dangerouslySetInnerHTML`.

The component does **not** sanitize HTML.

Only render trusted HTML or sanitize user-provided HTML before passing it to `TextHighlighter`.

## Development

From the monorepo root:

```bash
pnpm --filter @nigmatulin8/text-highlighter-react test --run
pnpm --filter @nigmatulin8/text-highlighter-react build
```

## License

MIT
