import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { TextHighlighter } from '../src';

describe('TextHighlighter', () => {
  it('highlights HTML content', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);

    const root = createRoot(container);

    act(() => {
      root.render(
        <TextHighlighter
          html="<p>Hello <strong>world</strong></p>"
          search="world"
        />,
      );
    });

    expect(container.innerHTML).toBe(
      '<div><p>Hello <strong><span class="highlighted">world</span></strong></p></div>',
    );

    act(() => {
      root.unmount();
    });

    container.remove();
  });

  it('passes options to core', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);

    const root = createRoot(container);

    act(() => {
      root.render(
        <TextHighlighter
          html="<p>Hello WORLD world</p>"
          search="world"
          options={{
            ignoreCase: true,
            highlightAll: true,
          }}
        />,
      );
    });

    expect(
      container.querySelectorAll('.highlighted').length,
    ).toBe(2);

    act(() => {
      root.unmount();
    });

    container.remove();
  });

  it('supports custom wrapper tag', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);

    const root = createRoot(container);

    act(() => {
      root.render(
        <TextHighlighter
          html="<p>Hello world</p>"
          search="world"
          wrapperTag="section"
        />,
      );
    });

    expect(
      container.firstElementChild?.tagName,
    ).toBe('SECTION');

    act(() => {
      root.unmount();
    });

    container.remove();
  });

  it('passes HTML attributes to the wrapper', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);

    const root = createRoot(container);

    act(() => {
      root.render(
        <TextHighlighter
          html="<p>Hello world</p>"
          search="world"
          className="content"
          data-testid="highlighter"
        />,
      );
    });

    expect(
      container.firstElementChild?.getAttribute('class'),
    ).toBe('content');

    expect(
      container.firstElementChild?.getAttribute('data-testid'),
    ).toBe('highlighter');

    act(() => {
      root.unmount();
    });

    container.remove();
  });
});
