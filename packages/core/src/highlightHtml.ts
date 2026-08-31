export interface HighlightOptions {
  ignoreCase?: boolean;
  highlightAll?: boolean;
  tag?: string;
  className?: string;
  excludedTags?: string[];
}

const DEFAULT_EXCLUDED_TAGS = [
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
];

export function highlightHtml(html: string, search: string, options: HighlightOptions = {}): string {
  if (!html || !search) {
    return html;
  }

  const {
    ignoreCase = false,
    highlightAll = true,
    tag = 'span',
    className = 'highlighted',
    excludedTags = DEFAULT_EXCLUDED_TAGS,
  } = options;

  const template = document.createElement('template');
  template.innerHTML = html;

  const fragment = template.content;
  const regex = createSearchRegex(search, ignoreCase, highlightAll);
  const textNodes = collectTextNodes(fragment, excludedTags);

  let highlightedCount = 0;

  for (const textNode of textNodes) {
    if (!textNode.parentNode) {
      continue;
    }

    if (!highlightAll && highlightedCount > 0) {
      break;
    }

    highlightedCount += highlightTextNode(document, textNode, regex, {
        tag,
        className,
        highlightAll,
      },
    );
  }

  return fragmentToHtml(fragment);
}

function createSearchRegex(search: string, ignoreCase: boolean, highlightAll: boolean): RegExp {
  const escapedSearch = escapeRegExp(search);

  const flags = [
    ignoreCase ? 'i' : '',
    highlightAll ? 'g' : '',
  ].join('');

  return new RegExp(escapedSearch, flags);
}

function collectTextNodes(fragment: DocumentFragment, excludedTags: string[]): Text[] {
  const excluded = new Set(
    excludedTags.map((tag) => tag.toUpperCase()),
  );

  const result: Text[] = [];

  const walker = document.createTreeWalker(
    fragment,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        let element: Element | null = node.parentElement;

        while (element) {
          if (excluded.has(element.tagName.toUpperCase())) {
            return NodeFilter.FILTER_REJECT;
          }
          element = element.parentElement;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  let current: Node | null;
  while ((current = walker.nextNode())) {
    result.push(current as Text);
  }

  return result;
}

function highlightTextNode(
  doc: Document,
  textNode: Text,
  regex: RegExp,
  options: {
    tag: string;
    className: string;
    highlightAll: boolean;
  },
): number {
  const {
    tag,
    className,
    highlightAll,
  } = options;

  const text = textNode.nodeValue ?? '';

  if (!text) {
    return 0;
  }

  regex.lastIndex = 0;

  const matches: Array<{
    start: number;
    end: number;
    value: string;
  }> = [];

  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const value = match[0];

    matches.push({
      start: match.index,
      end: match.index + value.length,
      value,
    });

    if (!highlightAll) {
      break;
    }

    if (value.length === 0) {
      regex.lastIndex += 1;
    }
  }

  if (matches.length === 0) {
    return 0;
  }

  const fragment = doc.createDocumentFragment();

  let cursor = 0;

  for (const match of matches) {
    if (match.start > cursor) {
      fragment.appendChild(
        doc.createTextNode(
          text.slice(cursor, match.start),
        ),
      );
    }

    const highlight = doc.createElement(tag);
    highlight.className = className;
    highlight.textContent = match.value;
    fragment.appendChild(highlight);

    cursor = match.end;
  }

  if (cursor < text.length) {
    fragment.appendChild(
      doc.createTextNode(
        text.slice(cursor),
      ),
    );
  }

  textNode.parentNode?.replaceChild(fragment, textNode);

  return matches.length;
}

function fragmentToHtml(fragment: DocumentFragment): string {
  const container = document.createElement('div');
  container.appendChild(
    fragment.cloneNode(true),
  );
  return container.innerHTML;
}

function escapeRegExp(value: string): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  );
}
