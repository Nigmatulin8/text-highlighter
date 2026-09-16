import { createApp } from 'vue';
import { describe, expect, it } from 'vitest';

import {
  TextHighlighter,
  TextHighlighterPlugin,
} from '../src';

describe('TextHighlighter', () => {
  it('highlights HTML content', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = createApp(TextHighlighter, {
      html: '<p>Hello <strong>world</strong></p>',
      search: 'world',
    });

    app.mount(container);

    expect(container.innerHTML).toBe(
      '<div><p>Hello <strong><span class="highlighted">world</span></strong></p></div>',
    );

    app.unmount();
    container.remove();
  });

  it('passes options to core', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = createApp(TextHighlighter, {
      html: '<p>Hello WORLD world</p>',
      search: 'world',
      options: {
        ignoreCase: true,
        highlightAll: true,
      },
    });

    app.mount(container);

    expect(
      container.querySelectorAll('.highlighted').length,
    ).toBe(2);

    app.unmount();
    container.remove();
  });

  it('supports custom wrapper tag', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = createApp(TextHighlighter, {
      html: '<p>Hello world</p>',
      search: 'world',
      wrapperTag: 'section',
    });

    app.mount(container);

    expect(container.firstElementChild?.tagName).toBe('SECTION');

    app.unmount();
    container.remove();
  });

  it('registers the component through the plugin', () => {
    const app = createApp({});

    app.use(TextHighlighterPlugin);

    expect(
      app.component('TextHighlighter'),
    ).toBe(TextHighlighter);
  });
});
