import type { App } from 'vue';

import TextHighlighter from './TextHighlighter';

export const TextHighlighterPlugin = {
  install(app: App): void {
    app.component(
      'TextHighlighter',
      TextHighlighter,
    );
  },
};

export default TextHighlighterPlugin;
