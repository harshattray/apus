// This file can be used to set up global configurations or mocks for your tests.
// For example, extending expect with jest-dom matchers:
import '@testing-library/jest-dom';

// You can add other global setup here, e.g.:
// import { vi } from 'vitest';
// vi.mock('some-module', () => {
//   return {
//     default: vi.fn(),
//   };
// });

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};
