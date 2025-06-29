// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {
    /* do nothing */
  }
  unobserve() {
    /* do nothing */
  }
  disconnect() {
    /* do nothing */
  }
};

// --- Comprehensive SVG Mocks for JSDOM (from MEMORY[433653a6-9041-4d40-876e-529338b5281e]) ---
import { vi } from 'vitest';

if (typeof window !== 'undefined') {
  // Ensure SVGElement and its prototype exist for getBoundingClientRect mock
  if (!(window as any).SVGElement) {
    (window as any).SVGElement = class MockSVGElement {};
  }
  if (!(window as any).SVGElement.prototype) {
    (window as any).SVGElement.prototype = {};
  }
  (window as any).SVGElement.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => '',
  }));

  // Mock SVGTextElement.prototype.getComputedTextLength
  if (!(window as any).SVGTextElement) {
    (window as any).SVGTextElement = class MockedSVGTextElement {};
  }
  if (!(window as any).SVGTextElement.prototype) {
    (window as any).SVGTextElement.prototype = {};
  }
  (window as any).SVGTextElement.prototype.getComputedTextLength = vi.fn(() => 50); // Return a mock length

  // Fallback: Also mock on SVGElement.prototype in case JSDOM returns a more generic type
  if ((window as any).SVGElement && (window as any).SVGElement.prototype) {
    if (!(window as any).SVGElement.prototype.getComputedTextLength) {
      (window as any).SVGElement.prototype.getComputedTextLength = vi.fn(() => 50);
    }
  }

  // Mock createSVGPoint if missing (adapted from previous attempts)
  if (!(window as any).SVGSVGElement) {
    (window as any).SVGSVGElement = class MockSVGSVGElement extends (window as any).SVGElement {};
  }
  if (!(window as any).SVGSVGElement.prototype) {
    (window as any).SVGSVGElement.prototype = {};
  }
  if (typeof (window as any).SVGSVGElement.prototype.createSVGPoint === 'undefined') {
    (window as any).SVGSVGElement.prototype.createSVGPoint = function () {
      // @ts-ignore: JSDOM should provide DOMPoint, or it needs polyfilling too
      const point = new DOMPoint();
      point.x = 0;
      point.y = 0;
      return point;
    };
  }

  // Mock createSVGRect if missing (adapted from previous attempts)
  if (typeof (window as any).SVGSVGElement.prototype.createSVGRect === 'undefined') {
    (window as any).SVGSVGElement.prototype.createSVGRect = function () {
      return { x: 0, y: 0, width: 0, height: 0 };
    };
  }

  console.log('Global test setup: Comprehensive mocks for SVG methods applied.');

  // Mock d3.pointer which is used in ScatterChart for tooltip positioning
  vi.mock('d3', async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, unknown>;
    return {
      ...actual,
      pointer: vi.fn().mockReturnValue([50, 50]), // Mock fixed position for testing
    };
  });
}
