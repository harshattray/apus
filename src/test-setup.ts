import { vi } from 'vitest';

// Mock SVGElement.prototype.getBoundingClientRect
if (typeof window !== 'undefined') {
  if (window.SVGElement && window.SVGElement.prototype) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.SVGElement.prototype as any).getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  } else {
    // Fallback: SVGElement or its prototype doesn't exist. Create them minimally.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).SVGElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SVGElement = class MockSVGElement {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).SVGElement.prototype) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SVGElement.prototype = {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SVGElement.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  }
}

// Mock SVGTextElement.prototype.getComputedTextLength
if (typeof window !== 'undefined') {
  // Ensure SVGTextElement exists globally and has a prototype
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(window as any).SVGTextElement) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SVGTextElement = class MockedSVGTextElement {};
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(window as any).SVGTextElement.prototype) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SVGTextElement.prototype = {};
  }

  // Assign the mock directly to SVGTextElement.prototype
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).SVGTextElement.prototype.getComputedTextLength = vi.fn(() => 50);

  // Fallback: Also mock on SVGElement.prototype in case JSDOM returns a more generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).SVGElement && (window as any).SVGElement.prototype) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).SVGElement.prototype.getComputedTextLength) {
      // Only add if not already present
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SVGElement.prototype.getComputedTextLength = vi.fn(() => 50);
    }
  }
}

console.log(
  'Global test setup v2: Mocks for getBoundingClientRect and getComputedTextLength (direct/fallback) applied.',
);
