import Vue from 'vue';
import { describe, expect, it } from 'vitest';

import {
  TextHighlighter,
  TextHighlighterPlugin,
} from '../src';

describe('TextHighlighter', () => {
  it('highlights HTML content', () => {
    const vm = new TextHighlighter({
      propsData: {
        html: '<p>Hello <strong>world</strong></p>',
        search: 'world',
      },
    }).$mount();

    expect(vm.$el.outerHTML).toBe(
      '<div><p>Hello <strong><span class="highlighted">world</span></strong></p></div>',
    );

    vm.$destroy();
  });

  it('passes options to core', () => {
    const vm = new TextHighlighter({
      propsData: {
        html: '<p>Hello WORLD world</p>',
        search: 'world',
        options: {
          ignoreCase: true,
          highlightAll: true,
        },
      },
    }).$mount();

    expect(
      vm.$el.querySelectorAll('.highlighted').length,
    ).toBe(2);

    vm.$destroy();
  });

  it('supports custom wrapper tag', () => {
    const vm = new TextHighlighter({
      propsData: {
        html: '<p>Hello world</p>',
        search: 'world',
        wrapperTag: 'section',
      },
    }).$mount();

    expect(vm.$el.tagName).toBe('SECTION');

    vm.$destroy();
  });

  it('registers the component through the plugin', () => {
    const LocalVue = Vue.extend();

    TextHighlighterPlugin.install(LocalVue);

    expect(
      (LocalVue as any).options.components.TextHighlighter,
    ).toBe(TextHighlighter);
  });
});
