import Vue from 'vue';

import TextHighlighter from './TextHighlighter';

export const TextHighlighterPlugin = {
  install(VueConstructor: typeof Vue): void {
    VueConstructor.component(
      'TextHighlighter',
      TextHighlighter,
    );
  },
};

export default TextHighlighterPlugin;
