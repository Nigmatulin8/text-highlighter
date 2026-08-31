import { beforeEach, describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';

import { highlightHtml } from '../src';

describe('highlightHtml', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;
    global.NodeFilter = dom.window.NodeFilter;
  });

  describe('plain text', () => {
    it('highlights a match in plain text', () => {
      const result = highlightHtml(
        'Hello how are you?',
        'how',
      );

      expect(result).toBe(
        'Hello <span class="highlighted">how</span> are you?',
      );
    });

    it('highlights all matches by default', () => {
      const result = highlightHtml(
        'how are you, how is your day?',
        'how',
      );

      expect(result).toBe(
        '<span class="highlighted">how</span> are you, <span class="highlighted">how</span> is your day?',
      );
    });

    it('highlights only the first match when highlightAll is disabled', () => {
      const result = highlightHtml(
        'how are you, how is your day?',
        'how',
        {
          highlightAll: false,
        },
      );

      expect(result).toBe(
        '<span class="highlighted">how</span> are you, how is your day?',
      );
    });

    it('returns the original HTML when search is empty', () => {
      const html = 'Hello how are you?';

      expect(
        highlightHtml(html, ''),
      ).toBe(html);
    });

    it('returns the original HTML when input is empty', () => {
      expect(
        highlightHtml('', 'hello'),
      ).toBe('');
    });

    it('returns the original HTML when there is no match', () => {
      const html = 'Hello world';

      expect(
        highlightHtml(html, 'test'),
      ).toBe(html);
    });

    it('highlights a match at the beginning of the text', () => {
      const result = highlightHtml(
        'Hello world',
        'Hello',
      );

      expect(result).toBe(
        '<span class="highlighted">Hello</span> world',
      );
    });

    it('highlights a match at the end of the text', () => {
      const result = highlightHtml(
        'Hello world',
        'world',
      );

      expect(result).toBe(
        'Hello <span class="highlighted">world</span>',
      );
    });

    it('highlights the entire text when it matches', () => {
      const result = highlightHtml(
        'Hello',
        'Hello',
      );

      expect(result).toBe(
        '<span class="highlighted">Hello</span>',
      );
    });

    it('does not highlight a partial match when there is no exact match', () => {
      const result = highlightHtml(
        'Hello world',
        'world!',
      );

      expect(result).toBe(
        'Hello world',
      );
    });
  });

  describe('case sensitivity', () => {
    it('is case-sensitive by default', () => {
      const result = highlightHtml(
        'Hello HOW are you?',
        'how',
      );

      expect(result).toBe(
        'Hello HOW are you?',
      );
    });

    it('matches case-insensitively when ignoreCase is enabled', () => {
      const result = highlightHtml(
        'Hello HOW are you?',
        'how',
        {
          ignoreCase: true,
        },
      );

      expect(result).toBe(
        'Hello <span class="highlighted">HOW</span> are you?',
      );
    });

    it('preserves the original matched text', () => {
      const result = highlightHtml(
        'Hello HoW are you?',
        'how',
        {
          ignoreCase: true,
        },
      );

      expect(result).toBe(
        'Hello <span class="highlighted">HoW</span> are you?',
      );
    });

    it('highlights all case-insensitive matches', () => {
      const result = highlightHtml(
        'Hello hello HELLO hElLo',
        'hello',
        {
          ignoreCase: true,
        },
      );

      expect(result).toBe(
        '<span class="highlighted">Hello</span> <span class="highlighted">hello</span> <span class="highlighted">HELLO</span> <span class="highlighted">hElLo</span>',
      );
    });
  });

  describe('HTML elements', () => {
    it('highlights text inside a bold element', () => {
      const result = highlightHtml(
        '<b>Hello how are you?</b>',
        'how',
      );

      expect(result).toBe(
        '<b>Hello <span class="highlighted">how</span> are you?</b>',
      );
    });

    it('highlights text inside an italic element', () => {
      const result = highlightHtml(
        '<i>Hello how are you?</i>',
        'how',
      );

      expect(result).toBe(
        '<i>Hello <span class="highlighted">how</span> are you?</i>',
      );
    });

    it('preserves existing HTML elements', () => {
      const result = highlightHtml(
        '<p>Hello <b>how</b> are <i>you</i>?</p>',
        'how',
      );

      expect(result).toBe(
        '<p>Hello <b><span class="highlighted">how</span></b> are <i>you</i>?</p>',
      );
    });

    it('highlights matches in multiple HTML elements', () => {
      const result = highlightHtml(
        '<b>how</b> are <i>how</i>?',
        'how',
      );

      expect(result).toBe(
        '<b><span class="highlighted">how</span></b> are <i><span class="highlighted">how</span></i>?',
      );
    });

    it('preserves nested HTML elements', () => {
      const result = highlightHtml(
        '<div><p><b>Hello how are you?</b></p></div>',
        'how',
      );

      expect(result).toBe(
        '<div><p><b>Hello <span class="highlighted">how</span> are you?</b></p></div>',
      );
    });

    it('does not modify HTML attributes', () => {
      const result = highlightHtml(
        '<div data-value="how">Hello world</div>',
        'how',
      );

      expect(result).toBe(
        '<div data-value="how">Hello world</div>',
      );
    });

    it('does not highlight tag names', () => {
      const result = highlightHtml(
        '<how>Hello world</how>',
        'how',
      );

      expect(result).toBe(
        '<how>Hello world</how>',
      );
    });

    it('preserves element attributes', () => {
      const result = highlightHtml(
        '<div id="test" class="content" data-value="hello">Hello world</div>',
        'world',
      );

      expect(result).toBe(
        '<div id="test" class="content" data-value="hello">Hello <span class="highlighted">world</span></div>',
      );
    });
  });

  describe('escaped HTML', () => {
    it('treats escaped HTML as text', () => {
      const result = highlightHtml(
        '&lt;b&gt;asdasd&lt;/b&gt;',
        'asd',
      );

      expect(result).toBe(
        '&lt;b&gt;<span class="highlighted">asd</span><span class="highlighted">asd</span>&lt;/b&gt;',
      );
    });

    it('does not convert escaped tags into HTML elements', () => {
      const result = highlightHtml(
        '&lt;b&gt;Hello world&lt;/b&gt;',
        'Hello',
      );

      expect(result).toBe(
        '&lt;b&gt;<span class="highlighted">Hello</span> world&lt;/b&gt;',
      );
    });

    it('highlights text inside escaped HTML', () => {
      const result = highlightHtml(
        '&lt;strong&gt;Hello&lt;/strong&gt;',
        'Hello',
      );

      expect(result).toBe(
        '&lt;strong&gt;<span class="highlighted">Hello</span>&lt;/strong&gt;',
      );
    });
  });

  describe('links', () => {
    it('highlights text inside a link', () => {
      const result = highlightHtml(
        '<a href="https://example.com">https://example.com</a>',
        'example',
      );

      expect(result).toBe(
        '<a href="https://example.com">https://<span class="highlighted">example</span>.com</a>',
      );
    });

    it('does not modify the href attribute', () => {
      const result = highlightHtml(
        '<a href="https://example.com">Example</a>',
        'example',
        {
          ignoreCase: true,
        },
      );

      expect(result).toBe(
        '<a href="https://example.com"><span class="highlighted">Example</span></a>',
      );
    });

    it('preserves link attributes', () => {
      const result = highlightHtml(
        '<a href="https://example.com" target="_blank" rel="noopener">Example</a>',
        'example',
        {
          ignoreCase: true,
        },
      );

      expect(result).toBe(
        '<a href="https://example.com" target="_blank" rel="noopener"><span class="highlighted">Example</span></a>',
      );
    });

    it('preserves ampersands inside URLs', () => {
      const result = highlightHtml(
        '<span><a href="https://mail.trueconf.com/?_task=mail&amp;_mbox=INBOX" target="_blank" rel="noopener">https://mail.trueconf.com/?_task=mail&amp;_mbox=INBOX</a></span>',
        'INBOX',
      );

      expect(result).toContain(
        'href="https://mail.trueconf.com/?_task=mail&amp;_mbox=INBOX"',
      );

      expect(result).toContain(
        'https://mail.trueconf.com/?_task=mail&amp;_mbox=<span class="highlighted">INBOX</span>',
      );
    });

    it('highlights text inside a link with HTML entities', () => {
      const result = highlightHtml(
        '<a href="https://example.com?a=1&amp;b=2">example.com?a=1&amp;b=2</a>',
        'b=2',
      );

      expect(result).toContain(
        '<a href="https://example.com?a=1&amp;b=2">',
      );

      expect(result).toContain(
        'a=1&amp;<span class="highlighted">b=2</span>',
      );
    });
  });

  describe('special characters', () => {
    it('highlights a search string containing regex characters', () => {
      const result = highlightHtml(
        'Price: $100. Price: $100.',
        '$100.',
      );

      expect(result).toBe(
        'Price: <span class="highlighted">$100.</span> Price: <span class="highlighted">$100.</span>',
      );
    });

    it('highlights brackets correctly', () => {
      const result = highlightHtml(
        'Hello [world] and [world].',
        '[world]',
      );

      expect(result).toBe(
        'Hello <span class="highlighted">[world]</span> and <span class="highlighted">[world]</span>.',
      );
    });

    it('highlights parentheses correctly', () => {
      const result = highlightHtml(
        'test (hello) test (hello)',
        '(hello)',
      );

      expect(result).toBe(
        'test <span class="highlighted">(hello)</span> test <span class="highlighted">(hello)</span>',
      );
    });

    it('highlights a string containing a backslash', () => {
      const result = highlightHtml(
        'path C:\\Users\\test',
        'C:\\Users\\test',
      );

      expect(result).toBe(
        'path <span class="highlighted">C:\\Users\\test</span>',
      );
    });

    it('highlights a string containing a question mark', () => {
      const result = highlightHtml(
        'Hello? How are you?',
        'How?',
      );

      expect(result).toBe(
        'Hello? How are you?',
      );
    });

    it('highlights a string containing an asterisk', () => {
      const result = highlightHtml(
        'value * value *',
        '*',
      );

      expect(result).toBe(
        'value <span class="highlighted">*</span> value <span class="highlighted">*</span>',
      );
    });
  });

  describe('customization', () => {
    it('uses a custom tag', () => {
      const result = highlightHtml(
        'Hello world',
        'world',
        {
          tag: 'mark',
        },
      );

      expect(result).toBe(
        'Hello <mark class="highlighted">world</mark>',
      );
    });

    it('uses a custom class name', () => {
      const result = highlightHtml(
        'Hello world',
        'world',
        {
          className: 'search-result',
        },
      );

      expect(result).toBe(
        'Hello <span class="search-result">world</span>',
      );
    });

    it('uses both custom tag and class name', () => {
      const result = highlightHtml(
        'Hello world',
        'world',
        {
          tag: 'mark',
          className: 'search-result',
        },
      );

      expect(result).toBe(
        'Hello <mark class="search-result">world</mark>',
      );
    });

    it('uses custom excluded tags', () => {
      const result = highlightHtml(
        '<code>hello</code><p>hello</p>',
        'hello',
        {
          excludedTags: ['CODE'],
        },
      );

      expect(result).toBe(
        '<code>hello</code><p><span class="highlighted">hello</span></p>',
      );
    });
  });

  describe('excluded elements', () => {
    it('does not highlight text inside script', () => {
      const result = highlightHtml(
        '<script>const value = "hello";</script><p>hello</p>',
        'hello',
      );

      expect(result).toContain(
        '<script>const value = "hello";</script>',
      );

      expect(result).toContain(
        '<p><span class="highlighted">hello</span></p>',
      );
    });

    it('does not highlight text inside style', () => {
      const result = highlightHtml(
        '<style>.hello { color: red; }</style><p>hello</p>',
        'hello',
      );

      expect(result).toContain(
        '<style>.hello { color: red; }</style>',
      );

      expect(result).toContain(
        '<p><span class="highlighted">hello</span></p>',
      );
    });

    it('does not highlight text inside noscript', () => {
      const result = highlightHtml(
        '<noscript>hello</noscript><p>hello</p>',
        'hello',
      );

      expect(result).toContain(
        '<noscript>hello</noscript>',
      );

      expect(result).toContain(
        '<p><span class="highlighted">hello</span></p>',
      );
    });
  });

  describe('multiple text nodes', () => {
    it('highlights matches across multiple elements', () => {
      const result = highlightHtml(
        '<b>Hello</b> <i>world</i> <span>Hello</span>',
        'Hello',
      );

      expect(result).toBe(
        '<b><span class="highlighted">Hello</span></b> <i>world</i> <span><span class="highlighted">Hello</span></span>',
      );
    });

    it('highlights only the first match across the entire document', () => {
      const result = highlightHtml(
        '<b>Hello</b> <i>Hello</i>',
        'Hello',
        {
          highlightAll: false,
        },
      );

      expect(result).toBe(
        '<b><span class="highlighted">Hello</span></b> <i>Hello</i>',
      );
    });

    it('does not merge separate text nodes when searching for a phrase', () => {
      const result = highlightHtml(
        '<b>Hello</b> <i>world</i>',
        'Hello world',
      );

      expect(result).toBe(
        '<b>Hello</b> <i>world</i>',
      );
    });
  });

  describe('whitespace', () => {
    it('preserves whitespace around the match', () => {
      const result = highlightHtml(
        '  Hello world  ',
        'world',
      );

      expect(result).toBe(
        '  Hello <span class="highlighted">world</span>  ',
      );
    });

    it('preserves new lines', () => {
      const result = highlightHtml(
        'Hello\nworld\nhello',
        'hello',
        {
          ignoreCase: true,
        },
      );

      expect(result).toBe(
        '<span class="highlighted">Hello</span>\nworld\n<span class="highlighted">hello</span>',
      );
    });

    it('preserves tabs', () => {
      const result = highlightHtml(
        'Hello\tworld',
        'world',
      );

      expect(result).toBe(
        'Hello\t<span class="highlighted">world</span>',
      );
    });
  });
});
