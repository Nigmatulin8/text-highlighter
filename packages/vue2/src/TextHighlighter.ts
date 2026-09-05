import Vue, { CreateElement, VNode } from 'vue';
import { highlightHtml, HighlightOptions } from '@nigmatulin8/text-highlighter-core';

export default Vue.extend({
  name: 'TextHighlighter',
  props: {
    html: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    wrapperTag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    highlightedHtml(): string {
      return highlightHtml(
        this.html,
        this.search,
        this.options as HighlightOptions,
      );
    },
  },
  render(h: CreateElement): VNode {
    return h(
      this.wrapperTag,
      {
        domProps: {
          innerHTML: this.highlightedHtml,
        },
      },
    );
  },
});
