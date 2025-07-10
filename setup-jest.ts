/**
 * Modern Angular 20 + Jest Setup (Zoneless)
 * Configuração moderna sem zone.js usando provideZonelessChangeDetection
 */

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize Angular testing environment without zone.js
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: true } },
);

// Essential browser APIs mocks for modern Angular
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});

// Mock modern web APIs
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() {
    return [];
  }
};

(global as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia for responsive design testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock animation frame
(global as any).requestAnimationFrame = jest.fn(
  (callback: FrameRequestCallback) => {
    setTimeout(callback, 0);
    return 0;
  },
);

(global as any).cancelAnimationFrame = jest.fn();
