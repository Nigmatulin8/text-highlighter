import { describe, expect, it } from 'vitest';

import {
  highlightHtml,
  type HighlightOptions,
} from '../src/index';

describe('public API', () => {
  it('exports highlightHtml', () => {
    expect(typeof highlightHtml).toBe('function');
  });

  it('exports HighlightOptions as a type', () => {
    const options: HighlightOptions = {
      ignoreCase: true,
      highlightAll: true,
      tag: 'mark',
      className: 'search-result',
      excludedTags: ['SCRIPT', 'STYLE'],
    };

    expect(options).toEqual({
      ignoreCase: true,
      highlightAll: true,
      tag: 'mark',
      className: 'search-result',
      excludedTags: ['SCRIPT', 'STYLE'],
    });
  });

  it('works through the public entry point', () => {
    const result = highlightHtml(
      '<p>Hello World</p>',
      'World',
    );

    expect(result).toBe(
      '<p>Hello <span class="highlighted">World</span></p>',
    );
  });
});
