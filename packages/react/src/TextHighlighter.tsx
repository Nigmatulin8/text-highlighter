import type { ElementType, HTMLAttributes } from 'react';
import { highlightHtml, HighlightOptions } from '@nigmatulin8/text-highlighter-core';

export interface TextHighlighterProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  html?: string;
  search?: string;
  options?: HighlightOptions;
  wrapperTag?: ElementType;
}

export default function TextHighlighter({
  html = '',
  search = '',
  options = {},
  wrapperTag = 'div',
  ...props
}: TextHighlighterProps) {
  const highlightedHtml = highlightHtml(
    html,
    search,
    options,
  );

  const Wrapper = wrapperTag;

  return (
    <Wrapper
      {...props}
      dangerouslySetInnerHTML={{
        __html: highlightedHtml,
      }}
    />
  );
}
