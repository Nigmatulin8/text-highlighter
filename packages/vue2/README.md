# @nigmatulin8/text-highlighter-vue2

Vue 2 component for highlighting text inside HTML content.

This package is a Vue 2 adapter for `@nigmatulin8/text-highlighter-core`.

## Installation

pnpm:

```bash
pnpm add @nigmatulin8/text-highlighter-vue2
```

npm:

```bash
npm install @nigmatulin8/text-highlighter-vue2
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

<script>
import {
  TextHighlighter,
} from '@nigmatulin8/text-highlighter-vue2';

export default {
  components: {
    TextHighlighter,
  },

  data() {
    return {
      html: '<p>Hello <strong>world</strong></p>',
      search: 'world',
    };
  },
};
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
import Vue from 'vue';
import {
  TextHighlighterPlugin,
} from '@nigmatulin8/text-highlighter-vue2';

Vue.use(TextHighlighterPlugin);
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
The component itself is responsible only for Vue 2 integration and rendering the resulting HTML.

```
Vue 2 component → core → highlighted HTML → Vue render function
```

## Security

This component renders the provided HTML using `innerHTML`.
The package does not sanitize HTML.

Only use trusted or properly sanitized HTML content.
Do not pass untrusted user-generated HTML without sanitizing it first.

## Browser support

This package targets Vue 2 applications and modern browsers supported by the underlying core package.

## Development

Install dependencies from the monorepo root:

```bash
pnpm install
```

Run tests:

```bash
pnpm --filter @nigmatulin8/text-highlighter-vue2 test --run
```

Build the package:

```bash
pnpm --filter @nigmatulin8/text-highlighter-vue2 build
```

## License

MIT
