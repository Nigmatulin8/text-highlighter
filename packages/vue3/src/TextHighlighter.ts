import { defineComponent, h } from 'vue';
import { highlightHtml, HighlightOptions } from '@nigmatulin8/text-highlighter-core';

export default defineComponent({
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
      type: Object as () => HighlightOptions,
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
        this.options,
      );
    },
  },
  render() {
    return h(
      this.wrapperTag,
      {
        innerHTML: this.highlightedHtml,
      },
    );
  },
});
