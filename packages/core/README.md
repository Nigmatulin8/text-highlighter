# @nigmatulin8/text-highlighter-core

Framework-agnostic HTML text highlighter for browser environments.

`@nigmatulin8/text-highlighter-core` highlights matching text inside an HTML string while preserving the existing HTML structure and attributes.

## Features

* Highlights text inside HTML strings
* Preserves existing HTML elements and attributes
* Supports nested elements
* Supports multiple text nodes
* Case-sensitive matching by default
* Optional case-insensitive matching
* Highlights all matches or only the first match
* Custom highlight tag
* Custom CSS class
* Configurable excluded tags
* Safely handles regex special characters in search strings
* Does not modify HTML attributes
* Does not highlight text inside excluded elements

## Installation

```bash
pnpm add @nigmatulin8/text-highlighter-core
```

Or with npm:

```bash
npm install @nigmatulin8/text-highlighter-core
```

## Usage

```ts
import { highlightHtml } from '@nigmatulin8/text-highlighter-core';

const html = '<p>Hello <strong>world</strong></p>';

const result = highlightHtml(html, 'world');

console.log(result);
```

Result:

```html
<p>Hello <strong><span class="highlighted">world</span></strong></p>
```

## API

### `highlightHtml`

```ts
function highlightHtml(
  html: string,
  search: string,
  options?: HighlightOptions,
): string;
```

### Parameters

#### `html`

The HTML string to search.

```ts
const html = `
  <div>
    <p>Hello world</p>
    <p>Another world</p>
  </div>
`;
```

#### `search`

The exact text to search for.

```ts
highlightHtml(html, 'world');
```

The search string is treated as plain text, not as a regular expression.

For example:

```ts
highlightHtml(html, 'foo.bar');
```

searches for the literal string `foo.bar`.

#### `options`

Optional configuration object.

```ts
interface HighlightOptions {
  ignoreCase?: boolean;
  highlightAll?: boolean;
  tag?: string;
  className?: string;
  excludedTags?: string[];
}
```

## Options

### `ignoreCase`

Controls case sensitivity.

Default:

```ts
false
```

Case-sensitive:

```ts
highlightHtml('<p>Hello HELLO hello</p>', 'hello');
```

Result:

```html
<p>Hello HELLO <span class="highlighted">hello</span></p>
```

Case-insensitive:

```ts
highlightHtml(
  '<p>Hello HELLO hello</p>',
  'hello',
  {
    ignoreCase: true,
  },
);
```

Result:

```html
<p><span class="highlighted">Hello</span> <span class="highlighted">HELLO</span> <span class="highlighted">hello</span></p>
```

### `highlightAll`

Controls whether all matches are highlighted.

Default:

```ts
true
```

Highlight all matches:

```ts
highlightHtml(
  '<p>foo foo foo</p>',
  'foo',
);
```

Result:

```html
<p>
  <span class="highlighted">foo</span>
  <span class="highlighted">foo</span>
  <span class="highlighted">foo</span>
</p>
```

Highlight only the first match:

```ts
highlightHtml(
  '<p>foo foo foo</p>',
  'foo',
  {
    highlightAll: false,
  },
);
```

Result:

```html
<p><span class="highlighted">foo</span> foo foo</p>
```

When `highlightAll` is `false`, only the first match in the entire HTML document is highlighted.

### `tag`

Controls the HTML element used for highlighting.

Default:

```ts
'span'
```

Example:

```ts
highlightHtml(
  '<p>Hello world</p>',
  'world',
  {
    tag: 'mark',
  },
);
```

Result:

```html
<p>Hello <mark class="highlighted">world</mark></p>
```

### `className`

Controls the CSS class applied to highlighted elements.

Default:

```ts
'highlighted'
```

Example:

```ts
highlightHtml(
  '<p>Hello world</p>',
  'world',
  {
    className: 'search-result',
  },
);
```

Result:

```html
<p>Hello <span class="search-result">world</span></p>
```

### `excludedTags`

Specifies HTML tags whose text should not be highlighted.

Default:

```ts
[
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
]
```

Example:

```ts
highlightHtml(
  `
    <div>Hello world</div>
    <script>
      const message = "world";
    </script>
  `,
  'world',
);
```

The text inside `<script>` is not highlighted.

Custom excluded tags can be provided:

```ts
highlightHtml(
  '<div>Hello world</div>',
  'world',
  {
    excludedTags: ['DIV'],
  },
);
```

## HTML Preservation

The highlighter works with the HTML structure instead of treating the entire input as plain text.

Existing elements are preserved:

```ts
highlightHtml(
  '<p>Hello <strong>beautiful world</strong></p>',
  'world',
);
```

Result:

```html
<p>Hello <strong>beautiful <span class="highlighted">world</span></strong></p>
```

Nested elements are preserved as well:

```ts
highlightHtml(
  '<div><p>Hello <strong><em>world</em></strong></p></div>',
  'world',
);
```

Result:

```html
<div><p>Hello <strong><em><span class="highlighted">world</span></em></strong></p></div>
```

## Attributes Are Preserved

The function only modifies text nodes.

HTML attributes are not searched or modified:

```ts
highlightHtml(
  '<a href="/search?query=world">world</a>',
  'world',
);
```

Result:

```html
<a href="/search?query=world">
  <span class="highlighted">world</span>
</a>
```

The `href` attribute remains unchanged.

## Escaped HTML

Escaped HTML is treated as text.

For example:

```ts
highlightHtml(
  '<p>&lt;strong&gt;world&lt;/strong&gt;</p>',
  'world',
);
```

The escaped tags remain text and are not converted into actual HTML elements.

## Browser Environment

This package uses browser DOM APIs such as:

* `document`
* `DocumentFragment`
* `TreeWalker`
* `NodeFilter`

Therefore, it is intended for browser environments or other environments that provide a compatible DOM implementation.

It does not require a framework and can be used with:

* React
* Vue
* Angular
* Svelte
* vanilla JavaScript
* vanilla TypeScript
* other browser-based applications

For Node.js-based testing or server-side environments, provide a DOM implementation such as `jsdom`.

## TypeScript

The package includes TypeScript declarations.

```ts
import {
  highlightHtml,
  type HighlightOptions,
} from '@nigmatulin8/text-highlighter-core';
```

## CSS

The library only adds the configured class. It does not provide any default styling.

For example:

```css
.highlighted {
  background: yellow;
}
```

You can use any CSS styling you need:

```css
.highlighted {
  background-color: #ffeb3b;
  color: inherit;
  border-radius: 2px;
}
```

## License

MIT
