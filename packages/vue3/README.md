# @nigmatulin8/text-highlighter-vue3

Vue 3 component for highlighting text inside HTML content.

This package is a Vue 3 adapter for `@nigmatulin8/text-highlighter-core`.

## Installation

pnpm:

```bash
pnpm add @nigmatulin8/text-highlighter-vue3
```

npm:

```bash
npm install @nigmatulin8/text-highlighter-vue3
```

## Usage

### Local registration

```vue
<template>
  <TextHighlighter
    :html="html"
    :search="search"
  />
</template>

<script setup>
import {
  TextHighlighter,
} from '@nigmatulin8/text-highlighter-vue3';

const html = '<p>Hello <strong>world</strong></p>';
const search = 'world';
</script>
```

The rendered result will be:

```html
<div>
  <p>
    Hello
    <strong>
      <span class="highlighted">world</span>
    </strong>
  </p>
</div>
```

### Global registration

You can register the component globally using the plugin:

```js
import { createApp } from 'vue';
import App from './App.vue';

import {
  TextHighlighterPlugin,
} from '@nigmatulin8/text-highlighter-vue3';

const app = createApp(App);

app.use(TextHighlighterPlugin);

app.mount('#app');
```

Then use the component anywhere in your application:

```vue
<template>
  <TextHighlighter
    :html="html"
    :search="search"
  />
</template>
```

## Props

### `html`

- Type: `String`
- Default: `''`

HTML content to process.

### `search`

- Type: `String`
- Default: `''`

Text to highlight.

### `options`

- Type: `Object`
- Default: `{}`

Options passed directly to `@nigmatulin8/text-highlighter-core`.

Supported options include:

- `ignoreCase`
- `highlightAll`
- `tag`
- `className`
- `excludedTags`

Example:

```vue
<TextHighlighter
  :html="html"
  :search="search"
  :options="{
    ignoreCase: true,
    highlightAll: true,
    tag: 'mark',
    className: 'my-highlight'
  }"
/>
```

### `wrapperTag`

- Type: `String`
- Default: `'div'`

HTML element used as the component root.

Example:

```vue
<TextHighlighter
  :html="html"
  :search="search"
  wrapper-tag="section"
/>
```

Result:

```html
<section>
  ...
</section>
```

## How it works

The Vue component delegates HTML processing to `@nigmatulin8/text-highlighter-core`.
The component itself is responsible only for Vue 3 integration and rendering the resulting HTML.

```
Vue 3 component → core → highlighted HTML → Vue render function
```

## Security

This component renders the provided HTML using `innerHTML`.
The package does not sanitize HTML.

Only use trusted or properly sanitized HTML content.
Do not pass untrusted user-generated HTML without sanitizing it first.

## Browser support

This package targets Vue 3 applications and modern browsers supported by the underlying core package.

## Development

Install dependencies from the monorepo root:

```bash
pnpm install
```

Run tests:

```bash
pnpm --filter @nigmatulin8/text-highlighter-vue3 test --run
```

Build the package:

```bash
pnpm --filter @nigmatulin8/text-highlighter-vue3 build
```

## License

MIT
